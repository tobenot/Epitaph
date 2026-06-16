export function projectMatchesCategory(project, categoryId) {
	if (!categoryId || categoryId === 'all') return true
	if (Array.isArray(project.category)) return project.category.includes(categoryId)
	return project.category === categoryId
}

export function buildHomeQuery({ category, facet, tag, q }) {
	const query = {}
	if (category && category !== 'all') query.category = category
	if (facet) query.facet = facet
	else if (tag) query.tag = tag
	if (q?.trim()) query.q = q.trim()
	return query
}

export function parseHomeQuery(query, validCategories) {
	const category = query.category && validCategories.includes(query.category) ? query.category : 'all'
	const facet = query.facet || null
	const tag = facet ? null : (query.tag || null)
	const search = query.q || ''
	return { category, facet, tag, search }
}

export function homeQueriesEqual(a, b) {
	const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})])
	for (const key of keys) {
		if ((a?.[key] || '') !== (b?.[key] || '')) return false
	}
	return true
}
