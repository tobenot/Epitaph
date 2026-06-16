export function isHighCompleteness(project) {
	if (project.completeness === 'partial' || project.completeness === 'low') return false
	if (project.completeness === 'high' || project.completeness === 'complete') return true
	if (project.status === 'released' || project.status === 'archived') return true
	return false
}

export function getPortfolioFilterKind(project) {
	if (project.portfolioKind === 'study') return 'study'
	if (isHighCompleteness(project)) return 'complete'
	return 'ongoing'
}

export const PORTFOLIO_FILTER_KINDS = ['complete', 'study', 'ongoing']
