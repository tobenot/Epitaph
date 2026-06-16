const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../src/config/projects');
const PRIDE_STEP = 1 << 10; // 1024，2 的幂；相邻项同余此模，中点用 >>1 可多次整除

function loadProjects() {
	const projects = [];
	function walk(dir) {
		for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
			const p = path.join(dir, ent.name);
			if (ent.isDirectory()) walk(p);
			else if (ent.name.endsWith('.js')) {
				const content = fs.readFileSync(p, 'utf8');
				const m = content.match(/pride:\s*(\d+)/);
				if (!m) continue;
				const title = content.match(/zh:\s*"([^"]+)"/);
				projects.push({
					id: path.basename(ent.name, '.js'),
					file: p,
					pride: +m[1],
					title: title?.[1],
				});
			}
		}
	}
	walk(PROJECTS_DIR);
	return projects;
}

function writePride(file, pride) {
	const content = fs.readFileSync(file, 'utf8');
	const updated = content.replace(/pride:\s*\d+/, `pride: ${pride}`);
	if (updated === content) throw new Error(`pride not updated: ${file}`);
	fs.writeFileSync(file, updated);
}

function sortedProjects(projects) {
	return [...projects].sort((a, b) => {
		if (b.pride !== a.pride) return b.pride - a.pride;
		return a.id.localeCompare(b.id);
	});
}

function renumber() {
	const projects = loadProjects();
	const sorted = sortedProjects(projects);
	sorted.forEach((p, i) => {
		const pride = (sorted.length - i) * PRIDE_STEP;
		writePride(p.file, pride);
	});
	console.log(`renumbered ${sorted.length} projects, step=${PRIDE_STEP}, top=${sorted.length * PRIDE_STEP}, bottom=${PRIDE_STEP}`);
}

function moveAfter(itemId, anchorId) {
	const projects = loadProjects();
	const sorted = sortedProjects(projects);
	const anchorIdx = sorted.findIndex(p => p.id === anchorId);
	const item = projects.find(p => p.id === itemId);
	if (!item) throw new Error(`item not found: ${itemId}`);
	if (anchorIdx === -1) throw new Error(`anchor not found: ${anchorId}`);

	const anchorPride = sorted[anchorIdx].pride;
	const next = sorted[anchorIdx + 1];
	const nextPride = next && next.id !== itemId ? next.pride : 0;

	let newPride;
	if (!next || next.id === itemId) {
		newPride = anchorPride - PRIDE_STEP;
	} else if (anchorPride - nextPride > 1) {
		newPride = (anchorPride + nextPride) >> 1;
	} else {
		console.error('gap exhausted, run: node scripts/pride-sort.js renumber');
		process.exit(1);
	}

	writePride(item.file, newPride);
	console.log(`${item.title}: ${item.pride} -> ${newPride} (after ${sorted[anchorIdx].title})`);
}

function moveGroupAfterAnchor(anchorId, ...itemIds) {
	let currentAnchor = anchorId;
	for (const itemId of itemIds) {
		moveAfter(itemId, currentAnchor);
		currentAnchor = itemId;
	}
}

function printTop(n = 15) {
	printList(n);
}

function printList(limit) {
	const sorted = sortedProjects(loadProjects());
	const rows = limit ? sorted.slice(0, limit) : sorted;
	const rankWidth = String(rows.length).length;
	const idWidth = Math.max(...rows.map(p => p.id.length));
	rows.forEach((p, i) => {
		const rank = String(i + 1).padStart(rankWidth);
		const id = p.id.padEnd(idWidth);
		console.log(`${rank}  ${id}  ${p.pride}  ${p.title}`);
	});
	if (limit && sorted.length > limit) {
		console.log(`... ${sorted.length - limit} more, run: npm run pride-sort -- list`);
	}
}

function findProjects(query) {
	const q = query.toLowerCase();
	const sorted = sortedProjects(loadProjects());
	const hits = sorted.filter(p =>
		p.id.includes(q) || (p.title && p.title.toLowerCase().includes(q))
	);
	if (!hits.length) {
		console.log(`no match: ${query}`);
		process.exit(1);
	}
	const idWidth = Math.max(...hits.map(p => p.id.length));
	hits.forEach(p => {
		const rank = sorted.findIndex(x => x.id === p.id) + 1;
		console.log(`${rank}  ${p.id.padEnd(idWidth)}  ${p.pride}  ${p.title}`);
	});
}

const [,, cmd, ...args] = process.argv;

switch (cmd) {
	case 'renumber':
		renumber();
		break;
	case 'move-after':
		moveAfter(args[0], args[1]);
		break;
	case 'move-group-after':
		moveGroupAfterAnchor(args[0], args.slice(1));
		break;
	case 'top':
		printTop(+args[0] || 15);
		break;
	case 'list':
		printList(args[0] ? +args[0] : 0);
		break;
	case 'find':
		findProjects(args.join(' '));
		break;
	default:
		console.log(`usage:
  node scripts/pride-sort.js renumber
  node scripts/pride-sort.js list [n]          # 全排序，或前 n 项
  node scripts/pride-sort.js find <关键词>      # 按标题/id 查名次
  node scripts/pride-sort.js move-after <item-id> <anchor-id>
  node scripts/pride-sort.js move-group-after <anchor-id> <item-id> [item-id...]
  node scripts/pride-sort.js top [n]           # 同 list [n]`);
		process.exit(cmd ? 1 : 0);
}
