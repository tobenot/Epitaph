function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
}

function inlineMarkdown(text) {
	let html = escapeHtml(text)
	html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
	html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")
	html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
	return html
}

function listLevel(indent) {
	return Math.floor(indent.length / 2)
}

function parseDialogLine(text) {
	const match = text.match(/^\*\*(.+?)\*\*([：:])\s*(.*)$/)
	if (!match) return null
	return {
		speaker: match[1],
		colon: match[2],
		body: match[3]
	}
}

function renderDialogLine(text) {
	const dialog = parseDialogLine(text)
	if (dialog) {
		return `<p class="dialog-line"><span class="dialog-speaker">${escapeHtml(dialog.speaker)}${dialog.colon}</span><span class="dialog-body">${inlineMarkdown(dialog.body)}</span></p>`
	}
	return `<p class="dialog-line dialog-line-plain">${inlineMarkdown(text)}</p>`
}

function collectDialogLines(lines, startIndex) {
	const dialogLines = []
	let i = startIndex

	while (i < lines.length) {
		const trimmed = lines[i].trim()

		if (trimmed.startsWith("> ")) {
			dialogLines.push(trimmed.slice(2))
			i++
			continue
		}

		if (!trimmed && dialogLines.length > 0) {
			let j = i + 1
			while (j < lines.length && !lines[j].trim()) j++
			if (j < lines.length && lines[j].trim().startsWith("> ")) {
				i = j
				continue
			}
		}

		break
	}

	return { dialogLines, nextIndex: i }
}

function renderDialogGroup(dialogLines) {
	const lines = dialogLines.map(renderDialogLine).join("\n")
	return `<div class="celebration-dialog">\n${lines}\n</div>`
}

function renderListItems(items) {
	if (!items.length) return ""

	let i = 0

	function walk(expectedLevel) {
		let chunk = "<ul>"
		while (i < items.length && items[i].level === expectedLevel) {
			chunk += `<li>${inlineMarkdown(items[i].text)}`
			i++
			if (i < items.length && items[i].level === expectedLevel + 1) {
				chunk += walk(expectedLevel + 1)
			}
			chunk += "</li>"
		}
		chunk += "</ul>"
		return chunk
	}

	return walk(items[0].level)
}

export function renderCelebrationMarkdown(text) {
	if (!text) return ""

	const lines = text.split("\n")
	const html = []
	let paragraph = []
	let listItems = []

	function flushParagraph() {
		if (!paragraph.length) return
		html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`)
		paragraph = []
	}

	function flushList() {
		if (!listItems.length) return
		html.push(renderListItems(listItems))
		listItems = []
	}

	function flushAll() {
		flushParagraph()
		flushList()
	}

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex]
		const trimmed = line.trim()

		if (!trimmed) {
			flushAll()
			continue
		}

		const listMatch = line.match(/^(\s*)-\s+(.+)$/)
		if (listMatch) {
			flushParagraph()
			listItems.push({
				level: listLevel(listMatch[1]),
				text: listMatch[2].trim()
			})
			continue
		}

		flushList()

		if (trimmed.startsWith("### ")) {
			flushParagraph()
			html.push(`<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`)
			continue
		}

		if (trimmed.startsWith("## ")) {
			flushParagraph()
			html.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`)
			continue
		}

		if (trimmed.startsWith("# ")) {
			flushParagraph()
			html.push(`<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`)
			continue
		}

		if (trimmed.startsWith("> ")) {
			flushParagraph()
			const { dialogLines, nextIndex } = collectDialogLines(lines, lineIndex)
			html.push(renderDialogGroup(dialogLines))
			lineIndex = nextIndex - 1
			continue
		}

		paragraph.push(trimmed)
	}

	flushAll()
	return html.join("\n")
}
