<template>
	<div class="celebration-page" :class="themeClass" v-if="celebration">
		<div
			class="celebration-bg"
			:class="{ 'has-image': !!backgroundUrl }"
			:style="backgroundLayerStyle"
			aria-hidden="true"
		>
			<div class="bunting"></div>
		</div>

		<article class="celebration-article">
			<header class="celebration-header">
				<p class="celebration-period" v-if="periodLabel">{{ periodLabel }}</p>
				<h1>{{ title }}</h1>
				<p class="celebration-subtitle" v-if="subtitle">{{ subtitle }}</p>
				<div class="decorative-line"></div>
				<p class="celebration-description" v-if="description">{{ description }}</p>
			</header>

			<div class="celebration-body">
				<template v-for="(block, index) in bodyBlocks" :key="index">
					<CelebrationProse v-if="block.type === 'prose'" :text="block.text" />

					<CelebrationPortrait
						v-else-if="block.type === 'portrait'"
						:character="resolveCharacter(block.character)"
						:align="block.align"
						:link="block.link"
						:locale="currentLocale"
					/>

					<CelebrationProjectEmbed
						v-else-if="block.type === 'project' && resolveProject(block.slug)"
						:project="resolveProject(block.slug)"
						:intro="block.intro"
						:align="block.align"
						:locale="currentLocale"
						@click="openProject"
					/>

					<p v-else-if="block.type === 'project'" class="missing-embed">
						{{ missingBoothText(block.slug) }}
					</p>
				</template>
			</div>
		</article>
	</div>

	<div class="celebration-page celebration-missing" v-else>
		<div class="celebration-article">
			<p>{{ $t("celebration.notFound") }}</p>
			<router-link to="/" class="back-home">{{ $t("common.actions.back") }}</router-link>
		</div>
	</div>
</template>

<script>
import config from "@/config"
import CelebrationProse from "@/components/CelebrationProse.vue"
import CelebrationPortrait from "@/components/CelebrationPortrait.vue"
import CelebrationProjectEmbed from "@/components/CelebrationProjectEmbed.vue"
import { getCelebrationById, getCelebrationBody, pickLocalized } from "@/utils/celebration"

export default {
	name: "Celebration",
	components: {
		CelebrationProse,
		CelebrationPortrait,
		CelebrationProjectEmbed
	},
	computed: {
		currentLocale() {
			return this.$i18n.locale
		},
		celebrationId() {
			return this.$route.params.id
		},
		celebration() {
			return getCelebrationById(this.celebrationId, config.celebrations)
		},
		bodyBlocks() {
			return getCelebrationBody(this.celebration, this.currentLocale)
		},
		themeClass() {
			const themeId = this.celebration?.theme?.id || "blackstone-beach"
			return `theme-${themeId}`
		},
		backgroundUrl() {
			return this.celebration?.theme?.backgroundUrl || ""
		},
		backgroundLayerStyle() {
			if (!this.backgroundUrl) return {}
			return {
				backgroundImage: `url(${this.backgroundUrl})`
			}
		},
		title() {
			return pickLocalized(this.celebration?.titleKey, this.currentLocale)
		},
		subtitle() {
			return pickLocalized(this.celebration?.subtitleKey, this.currentLocale)
		},
		description() {
			return pickLocalized(this.celebration?.descriptionKey, this.currentLocale)
		},
		periodLabel() {
			const period = this.celebration?.period
			if (!period?.start && !period?.end) return ""
			if (period.start && period.end) {
				return `${period.start} — ${period.end}`
			}
			return period.start || period.end
		}
	},
	mounted() {
		document.body.classList.add("celebration-active")
	},
	unmounted() {
		document.body.classList.remove("celebration-active")
	},
	methods: {
		resolveCharacter(characterId) {
			if (!characterId || !this.celebration?.characters) return null
			return this.celebration.characters[characterId] || null
		},
		resolveProject(slug) {
			return config.projects.find((p) => p.slug === slug) || null
		},
		openProject(slug) {
			this.$router.push({ name: "Project", params: { slug } })
		},
		missingBoothText(slug) {
			return this.$t("celebration.missingBooth", { slug })
		}
	}
}
</script>

<style scoped lang="scss">
.celebration-page {
	--fair-bg: #0a0e14;
	--fair-surface: #1a2332;
	--fair-text: #e8eef4;
	--fair-muted: rgba(200, 215, 230, 0.72);
	--fair-accent: #ffc878;
	--card-bg: #f9f8f4;
	--primary-color: #4a4a4a;
	--secondary-color: #8d8d8d;
	--accent-color: #bca979;
	--shadow-color: rgba(0, 0, 0, 0.35);

	position: relative;
	width: 100vw;
	margin-left: calc(50% - 50vw);
	margin-right: calc(50% - 50vw);
	min-height: 100vh;
	color: var(--fair-text);
	margin-top: -2rem;
	margin-bottom: -3rem;
	padding: 2rem 1rem 5rem;
	overflow: hidden;
}

.celebration-bg {
	position: absolute;
	inset: 0;
	background:
		radial-gradient(ellipse 80% 50% at 50% 0%, rgba(40, 70, 110, 0.35), transparent),
		linear-gradient(180deg, #0a0e14 0%, #0f1419 40%, #141c28 100%);
	pointer-events: none;
	z-index: 0;

	&.has-image {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		background: rgba(8, 12, 18, 0.62);
	}

	&.has-image::after {
		background: rgba(8, 12, 18, 0.48);
	}
}

.bunting {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 12px;
	background: repeating-linear-gradient(
		90deg,
		#ff6b6b 0 24px,
		#ffd93d 24px 48px,
		#6bcb77 48px 72px,
		#4d96ff 72px 96px
	);
	opacity: 0.85;
	z-index: 1;
}

.celebration-article {
	position: relative;
	z-index: 1;
	max-width: 680px;
	margin: 0 auto;
}

.celebration-header {
	text-align: center;
	padding: 1rem 0 2.5rem;

	h1 {
		font-family: "Playfair Display", serif;
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		color: var(--fair-text);
		margin: 0 0 0.75rem;
		letter-spacing: 0.02em;
	}

	.celebration-period {
		font-family: "Lora", serif;
		font-size: 0.85rem;
		color: var(--fair-muted);
		margin-bottom: 0.5rem;
		letter-spacing: 0.08em;
	}

	.celebration-subtitle {
		font-family: "Lora", serif;
		font-size: 1.05rem;
		color: var(--fair-accent);
		margin: 0 0 1rem;
	}

	.celebration-description {
		font-family: "Lora", serif;
		font-size: 0.95rem;
		line-height: 1.75;
		color: var(--fair-muted);
		margin: 1rem auto 0;
		max-width: 36em;
	}

	.decorative-line {
		width: 120px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--fair-accent), transparent);
		margin: 0 auto;
	}
}

.celebration-body {
	&::after {
		content: "";
		display: table;
		clear: both;
	}
}

.missing-embed {
	font-family: "Lora", serif;
	font-size: 0.9rem;
	color: var(--fair-muted);
	font-style: italic;
	padding: 0.75rem 1rem;
	border: 1px dashed rgba(255, 200, 120, 0.3);
	border-radius: 8px;
	clear: both;
}

.celebration-missing {
	text-align: center;
	padding-top: 4rem;

	p {
		font-family: "Lora", serif;
		color: var(--fair-muted);
		margin-bottom: 1.5rem;
	}

	.back-home {
		font-family: "Lora", serif;
		color: var(--fair-accent);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
}

@media (max-width: 768px) {
	.celebration-page {
		margin-top: -1rem;
		padding-bottom: 4rem;
	}

	.celebration-bg.has-image {
		background-attachment: scroll;
	}
}
</style>

<style lang="scss">
body.celebration-active {
	background-color: #0a0e14;

	&::before {
		opacity: 0;
	}
}
</style>
