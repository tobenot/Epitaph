import covers from '@/data/bilibili-covers.json'

export function getBilibiliCover(bvid) {
	if (!bvid) return null
	return covers[bvid] || null
}

export function getProjectBilibiliCover(project) {
	if (!project?.bilibiliVideoId) return project?.image || null
	return getBilibiliCover(project.bilibiliVideoId) || project.image || null
}
