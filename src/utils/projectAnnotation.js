import { isHighCompleteness } from './portfolio'

const SILENT_CARD_STATUSES = new Set(['released'])

export function getCardAnnotationParts(project) {
	const parts = []
	if (project.portfolioKind === 'study') {
		parts.push('portfolioKind.study')
	}
	const status = project.status
	if (status && !isSilentCardStatus(status, project)) {
		parts.push(`status.${status}`)
	}
	return parts
}

export function isSilentCardStatus(status, project) {
	if (SILENT_CARD_STATUSES.has(status)) return true
	if (status === 'archived' && isHighCompleteness(project)) return true
	return false
}

export function isDraftLikeProject(project) {
	if (project.status === 'concept') return true
	if (project.completeness === 'partial' || project.completeness === 'low') return true
	return false
}

export function getCardFrameClass(project) {
	const complete = isHighCompleteness(project)
	return {
		'is-complete': complete,
		'is-incomplete': !complete,
		'is-study': project.portfolioKind === 'study',
		'is-draft': !complete && isDraftLikeProject(project),
		'is-ongoing': !complete && !isDraftLikeProject(project)
	}
}

export function formatAnnotationParts(parts, t) {
	return parts.map((key) => t(`project.${key}`)).join(' · ')
}
