<template>
	<div class="celebration-project-embed" :class="[`align-${align}`, { 'has-intro': !!intro }]">
		<div
			class="experience-card embed-card"
			:class="getCardFrameClass(project)"
			@click="$emit('click', project.slug)"
		>
			<div class="card-image" v-if="projectImage">
				<img
					:src="projectImage"
					:alt="title"
					:referrerpolicy="project.bilibiliVideoId ? 'no-referrer' : undefined"
				>
				<div class="explore-text">{{ $t("common.actions.explore") }}</div>
			</div>
			<div class="card-content">
				<div class="card-header">
					<h3>{{ title }}</h3>
				</div>
				<p class="card-desc">{{ description }}</p>
			</div>
		</div>
		<CelebrationProse v-if="intro" class="embed-side" :text="intro" />
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
		align: {
			type: String,
			default: "left"
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
	margin: 1.25rem 0;

	&::after {
		content: "";
		display: table;
		clear: both;
	}
}

.embed-card {
	background-color: var(--card-bg);
	box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4);
	overflow: hidden;
	border: 3px solid rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	cursor: pointer;
	transition: transform 0.15s ease, box-shadow 0.15s ease;
	border-left: 5px solid var(--accent-color);
	width: 220px;

	&.is-study {
		border-left: 3px solid #9e8e7e;
		background-color: rgba(158, 142, 126, 0.05);

		.card-content {
			border-top: 1px dashed rgba(158, 142, 126, 0.25);
		}
	}

	&.is-complete {
		border-left-color: var(--accent-color);
	}

	&.is-incomplete.is-draft {
		border-left-style: dashed;
		border-left-color: rgba(var(--accent-color-rgb), 0.45);
	}

	&.is-incomplete.is-ongoing {
		border-left-style: dashed;
		border-left-color: var(--secondary-color);
	}

	&.is-incomplete {
		opacity: 0.75;

		.card-image img {
			filter: grayscale(40%);
			transition: filter 0.3s ease;
		}

		&:hover {
			opacity: 1;

			.card-image img {
				filter: grayscale(0%);
			}
		}
	}

	&:hover {
		transform: translate(-3px, -3px);
		box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.45);

		.explore-text {
			opacity: 1;
		}
	}
}

.card-image {
	position: relative;
	width: 100%;
	padding-top: 56.25%;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.explore-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.88);
		color: white;
		padding: 0.5rem 1rem;
		border: 2px solid rgba(255, 200, 120, 0.45);
		opacity: 0;
		transition: opacity 0.2s ease;
		font-family: "Lora", serif;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		z-index: 2;
		pointer-events: none;
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.35);
	}
}

.card-content {
	padding: 0.85rem;
	display: flex;
	flex-direction: column;
	flex: 1;
	text-align: center;
	align-items: center;
}

.card-header {
	margin-bottom: 0.4rem;
	width: 100%;

	h3 {
		font-family: "Playfair Display", serif;
		font-size: 1rem;
		line-height: 1.35;
		color: var(--primary-color);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
}

.card-desc {
	font-family: "Lora", serif;
	font-size: 0.8rem;
	line-height: 1.55;
	color: var(--secondary-color);
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.embed-side {
	font-size: 0.95rem;
	text-align: center;

	:deep(p:last-child) {
		margin-bottom: 0;
	}
}

.align-left.has-intro,
.align-right.has-intro {
	display: flex;
	align-items: center;
	gap: 1.25rem;

	.embed-card {
		float: none;
		flex-shrink: 0;
		margin: 0;
	}

	.embed-side {
		flex: 1;
		min-width: 0;
	}
}

.align-left.has-intro {
	flex-direction: row;
}

.align-right.has-intro {
	flex-direction: row-reverse;
}

.align-left {
	&:not(.has-intro) .embed-card {
		float: left;
		margin: 0 1.25rem 0.5rem 0;
	}
}

.align-right {
	&:not(.has-intro) .embed-card {
		float: right;
		margin: 0 0 0.5rem 1.25rem;
	}
}

.align-center {
	.embed-card {
		margin-left: auto;
		margin-right: auto;
	}

	&.has-intro .embed-side {
		margin-top: 0.75rem;
		clear: both;
	}
}

@media (max-width: 600px) {
	.align-left.has-intro,
	.align-right.has-intro {
		flex-direction: column;
		align-items: center;
	}

	.embed-card {
		float: none !important;
		width: min(220px, 100%);
		margin-left: auto !important;
		margin-right: auto !important;
	}

	.embed-side {
		clear: both;
		padding-top: 0.75rem;
		width: 100%;
	}
}
</style>
