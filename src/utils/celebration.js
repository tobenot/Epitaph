function isSidePortrait(block) {
	return block.type === "portrait" && (block.align === "left" || block.align === "right")
}

export function buildBodyFlowGroups(blocks) {
	const groups = []
	let plain = { type: "plain", items: [] }

	function flushPlain() {
		if (!plain.items.length) return
		groups.push(plain)
		plain = { type: "plain", items: [] }
	}

	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i]

		if (!isSidePortrait(block)) {
			plain.items.push(block)
			continue
		}

		const tail = []
		let j = i + 1
		while (j < blocks.length && blocks[j].type === "prose") {
			tail.push(blocks[j])
			j++
		}

		if (tail.length === 0 && plain.items.length > 0 && plain.items[plain.items.length - 1].type === "prose") {
			tail.push(plain.items.pop())
		}

		flushPlain()
		groups.push({ type: "aside", portrait: block, tail })
		i = j - 1
	}

	flushPlain()
	return groups
}

export function getCelebrationById(id, celebrations) {
	return celebrations?.[id] ?? null
}

function celebrationIncludesSlug(celebration, slug) {
	if (celebration.body?.some((block) => block.type === "project" && block.slug === slug)) {
		return true
	}
	return celebration.stops?.some((stop) => stop.type === "booth" && stop.slug === slug)
}

export function findCelebrationsForSlug(slug, celebrations) {
	if (!celebrations || !slug) return []
	return Object.values(celebrations).filter((celebration) => {
		if (celebration.hidden) return false
		return celebrationIncludesSlug(celebration, slug)
	})
}

export function getCelebrationBody(celebration, locale) {
	if (!celebration?.body?.length) return []
	return celebration.body.map((block) => {
		if (block.type === "prose") {
			return {
				type: "prose",
				text: pickLocalized(block.textKey, locale)
			}
		}
		if (block.type === "portrait") {
			const character = celebration.characters?.[block.character]
			return {
				type: "portrait",
				character: block.character,
				align: block.align || "left",
				link: block.link || character?.link || ""
			}
		}
		if (block.type === "project") {
			return {
				type: "project",
				slug: block.slug,
				intro: pickLocalized(block.introKey, locale),
				align: block.align || "left"
			}
		}
		return block
	})
}

export function pickLocalized(keyObj, locale) {
	if (!keyObj) return ""
	return keyObj[locale] || keyObj.zh || ""
}

const SCROLL_KEY_PREFIX = "celebration-scroll:"

export function saveCelebrationScroll(celebrationId) {
	if (!celebrationId) return
	sessionStorage.setItem(`${SCROLL_KEY_PREFIX}${celebrationId}`, String(window.scrollY))
}

export function consumeCelebrationScroll(celebrationId) {
	if (!celebrationId) return null
	const key = `${SCROLL_KEY_PREFIX}${celebrationId}`
	const raw = sessionStorage.getItem(key)
	if (raw == null) return null
	sessionStorage.removeItem(key)
	const y = Number(raw)
	return Number.isFinite(y) ? y : null
}

export function buildCelebrationReturnRoute(celebrationId) {
	return {
		path: `/celebration/${celebrationId}`,
		query: { restore: "1" }
	}
}
