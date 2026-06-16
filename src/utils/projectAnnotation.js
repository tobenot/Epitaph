import { isExperienceable, isHighCompleteness } from './portfolio'

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
	if (isExperienceable(project)) {
		parts.push('experienceable.yes')
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
	const study = project.portfolioKind === 'study'
	const complete = isHighCompleteness(project)
	return {
		'is-study': study,
		'is-complete': complete && !study,
		'is-incomplete': !complete && !study,
		'is-draft': !complete && !study && isDraftLikeProject(project),
		'is-ongoing': !complete && !study && !isDraftLikeProject(project)
	}
}

export function formatAnnotationParts(parts, t) {
	return parts.map((key) => t(`project.${key}`)).join(' · ')
}
