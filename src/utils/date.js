export function formatDate(date, { separator = '.' } = {}) {
	if (!date?.year) return ''
	let formatted = String(date.year)
	if (date.month) {
		formatted += separator + String(date.month).padStart(2, '0')
		if (date.day) {
			formatted += separator + String(date.day).padStart(2, '0')
		}
	}
	return formatted
}

export function compareDateDesc(a, b) {
	if (!a && !b) return 0
	if (!a) return 1
	if (!b) return -1
	if (a.year !== b.year) return b.year - a.year
	if ((a.month || 0) !== (b.month || 0)) return (b.month || 0) - (a.month || 0)
	return (b.day || 0) - (a.day || 0)
}
