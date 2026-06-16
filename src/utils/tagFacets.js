export function tagMatchesRule(tag, rule) {
	return tag.includes(rule) || rule.includes(tag)
}

export function tagMatchesFacet(tag, facet) {
	if (!facet?.match?.length) return false
	return facet.match.some(rule => tagMatchesRule(tag, rule))
}

export function projectMatchesFacet(project, facet) {
	if (!project?.tags?.length || !facet) return false
	return project.tags.some(tag => tagMatchesFacet(tag, facet))
}

export function findFacetForTag(tag, facets) {
	return facets.find(facet => tagMatchesFacet(tag, facet)) || null
}

export function resolveTagFilter(tag, facets) {
	const facet = findFacetForTag(tag, facets)
	if (facet) return { type: 'facet', id: facet.id }
	return { type: 'tag', value: tag }
}

export function countProjectsForFacet(projects, facet) {
	return projects.filter(project => projectMatchesFacet(project, facet)).length
}

export function buildFacetCounts(projects, facets) {
	return facets.reduce((counts, facet) => {
		counts[facet.id] = countProjectsForFacet(projects, facet)
		return counts
	}, {})
}

export function prioritizeTagsForDisplay(project, facets, activeFacetId = null, limit = 3) {
	const tags = project?.tags || []
	if (!tags.length) return []

	const activeFacet = activeFacetId ? facets.find(f => f.id === activeFacetId) : null
	const ranked = [...tags].sort((a, b) => {
		const score = tag => {
			if (activeFacet && tagMatchesFacet(tag, activeFacet)) return 0
			if (findFacetForTag(tag, facets)) return 1
			return 2
		}
		const diff = score(a) - score(b)
		if (diff !== 0) return diff
		return a.length - b.length
	})

	return ranked.slice(0, limit)
}
