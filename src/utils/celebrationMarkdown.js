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

export function renderCelebrationMarkdown(text) {
	if (!text) return ""

	const lines = text.split("\n")
	const html = []
	let paragraph = []

	function flushParagraph() {
		if (!paragraph.length) return
		html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`)
		paragraph = []
	}

	for (const line of lines) {
		const trimmed = line.trim()

		if (!trimmed) {
			flushParagraph()
			continue
		}

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
			html.push(`<blockquote>${inlineMarkdown(trimmed.slice(2))}</blockquote>`)
			continue
		}

		paragraph.push(trimmed)
	}

	flushParagraph()
	return html.join("\n")
}
