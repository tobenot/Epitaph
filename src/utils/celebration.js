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
			return {
				type: "portrait",
				character: block.character,
				align: block.align || "left"
			}
		}
		if (block.type === "project") {
			return {
				type: "project",
				slug: block.slug,
				intro: pickLocalized(block.introKey, locale)
			}
		}
		return block
	})
}

export function pickLocalized(keyObj, locale) {
	if (!keyObj) return ""
	return keyObj[locale] || keyObj.zh || ""
}
