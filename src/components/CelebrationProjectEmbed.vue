<template>
	<div class="celebration-project-embed">
		<div
			class="embed-card"
			:class="getCardFrameClass(project)"
			@click="$emit('click', project.slug)"
		>
			<div class="embed-thumb" v-if="projectImage">
				<img
					:src="projectImage"
					:alt="title"
					:referrerpolicy="project.bilibiliVideoId ? 'no-referrer' : undefined"
				>
			</div>
			<div class="embed-body">
				<h3>{{ title }}</h3>
				<p class="embed-desc">{{ description }}</p>
				<span class="embed-link">{{ $t("common.actions.viewProject") }} →</span>
			</div>
		</div>
		<CelebrationProse v-if="intro" class="embed-intro" :text="intro" />
	</div>
</template>

<script>
import CelebrationProse from "@/components/CelebrationProse.vue"
import { getProjectBilibiliCover } from "@/utils/bilibili"
import { getCardFrameClass } from "@/utils/projectAnnotation"
import { pickLocalized } from "@/utils/celebration"

export default {
	name: "CelebrationProjectEmbed",
	components: {
		CelebrationProse
	},
	emits: ["click"],
	props: {
		project: {
			type: Object,
			required: true
		},
		intro: {
			type: String,
			default: ""
		},
		locale: {
			type: String,
			required: true
		}
	},
	computed: {
		title() {
			return pickLocalized(this.project.titleKey, this.locale)
		},
		description() {
			return pickLocalized(this.project.descriptionKey, this.locale)
		},
		projectImage() {
			return getProjectBilibiliCover(this.project)
		}
	},
	methods: {
		getCardFrameClass
	}
}
</script>

<style scoped lang="scss">
.celebration-project-embed {
	margin: 1.5rem 0;
	clear: both;
}

.embed-card {
	display: flex;
	gap: 0.85rem;
	padding: 0.75rem;
	border-radius: 8px;
	background: var(--card-bg);
	border: 1px solid rgba(0, 0, 0, 0.08);
	border-left: 3px solid var(--accent-color);
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	max-width: 100%;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
	}

	&.is-study {
		border-left-color: #9e8e7e;
	}

	&.is-incomplete {
		opacity: 0.85;
	}
}

.embed-thumb {
	flex-shrink: 0;
	width: 96px;
	aspect-ratio: 16 / 9;
	border-radius: 4px;
	overflow: hidden;
	background: rgba(0, 0, 0, 0.06);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
}

.embed-body {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	min-width: 0;
	flex: 1;

	h3 {
		font-family: "Playfair Display", serif;
		font-size: 1rem;
		line-height: 1.3;
		color: var(--primary-color);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.embed-desc {
		font-family: "Lora", serif;
		font-size: 0.8rem;
		line-height: 1.5;
		color: var(--secondary-color);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.embed-link {
		font-family: "Lora", serif;
		font-size: 0.75rem;
		color: var(--accent-color);
		margin-top: auto;
	}
}

.embed-intro {
	margin-top: 0.75rem;
	padding-left: 0.25rem;
	font-size: 0.95rem;

	:deep(p:last-child) {
		margin-bottom: 0;
	}
}
</style>
