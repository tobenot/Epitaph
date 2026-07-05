<template>
	<div class="celebration-page" :class="themeClass" v-if="celebration">
		<div
			class="celebration-bg"
			:class="{ 'has-image': !!backgroundUrl }"
			:style="backgroundLayerStyle"
			aria-hidden="true"
		>
			<div class="bunting" role="presentation"></div>
			<div class="fair-lights" role="presentation"></div>
		</div>

		<CelebrationConfettiRain />

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
import CelebrationConfettiRain from "@/components/CelebrationConfettiRain.vue"
import { getCelebrationById, getCelebrationBody, pickLocalized } from "@/utils/celebration"

export default {
	name: "Celebration",
	components: {
		CelebrationProse,
		CelebrationPortrait,
		CelebrationProjectEmbed,
		CelebrationConfettiRain
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
$bunting-svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='36' viewBox='0 0 128 36'%3E%3Cpolygon points='0,0 32,0 32,22 16,36 0,22' fill='%23ff6b6b'/%3E%3Cpolygon points='32,0 64,0 64,22 48,36 32,22' fill='%23ffd93d'/%3E%3Cpolygon points='64,0 96,0 96,22 80,36 64,22' fill='%236bcb77'/%3E%3Cpolygon points='96,0 128,0 128,22 112,36 96,22' fill='%234d96ff'/%3E%3C/svg%3E");

.celebration-page {
	--fair-bg: #0a0e14;
	--fair-surface: #141c28;
	--fair-text: #e8eef4;
	--fair-muted: rgba(200, 215, 230, 0.72);
	--fair-accent: #ffc878;
	--fair-accent-hot: #ffb347;
	--fair-slab-border: rgba(255, 200, 120, 0.28);
	--card-bg: #f4f2ec;
	--primary-color: #3a3a3a;
	--secondary-color: #7a7a7a;
	--accent-color: #bca979;
	--shadow-color: rgba(0, 0, 0, 0.35);
	--brutal-shadow: 6px 6px 0 rgba(0, 0, 0, 0.45);

	position: relative;
	width: 100vw;
	margin-left: calc(50% - 50vw);
	margin-right: calc(50% - 50vw);
	min-height: 100vh;
	color: var(--fair-text);
	margin-top: -2rem;
	margin-bottom: -3rem;
	padding: 3.5rem 1rem 5rem;
	overflow: hidden;

	&.theme-blackstone-beach {
		--fair-accent: #ffb347;
		--fair-slab-border: rgba(255, 180, 90, 0.32);

		.celebration-bg:not(.has-image) {
			background:
				radial-gradient(ellipse 100% 55% at 50% 100%, rgba(18, 38, 58, 0.55), transparent),
				radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255, 160, 70, 0.08), transparent),
				radial-gradient(ellipse 80% 50% at 50% 0%, rgba(40, 70, 110, 0.35), transparent),
				linear-gradient(180deg, #070a0f 0%, #0c1118 38%, #121820 72%, #0a0e14 100%);
		}
	}
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

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.012) 0 1px,
			transparent 1px 3px
		);
		opacity: 0.6;
		z-index: 1;
	}

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		background: rgba(8, 12, 18, 0.62);
		z-index: 2;
	}

	&.has-image::after {
		background: linear-gradient(
			180deg,
			rgba(8, 12, 18, 0.55) 0%,
			rgba(8, 12, 18, 0.42) 45%,
			rgba(8, 12, 18, 0.58) 100%
		);
	}
}

.bunting {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 36px;
	background-image: $bunting-svg;
	background-repeat: repeat-x;
	background-size: 128px 36px;
	filter: drop-shadow(0 4px 0 rgba(0, 0, 0, 0.35));
	z-index: 3;
}

.fair-lights {
	position: absolute;
	top: 36px;
	left: 0;
	right: 0;
	height: 120px;
	background: radial-gradient(ellipse 85% 100% at 50% 0%, rgba(255, 170, 80, 0.14), transparent 70%);
	z-index: 2;
	pointer-events: none;
}

.celebration-article {
	position: relative;
	z-index: 2;
	max-width: 680px;
	margin: 0 auto;
	padding: 2rem 1.75rem 2.5rem;
	background: rgba(10, 14, 20, 0.78);
	border: 3px solid var(--fair-slab-border);
	box-shadow: var(--brutal-shadow);
}

.celebration-header {
	text-align: center;
	padding: 0 0 2rem;
	border-bottom: 3px solid rgba(255, 200, 120, 0.12);
	margin-bottom: 0.5rem;

	h1 {
		font-family: "Playfair Display", serif;
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		color: var(--fair-text);
		margin: 0 0 0.75rem;
		letter-spacing: 0.02em;
		text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
	}

	.celebration-period {
		display: inline-block;
		font-family: "Lora", serif;
		font-size: 0.72rem;
		color: var(--fair-accent);
		margin-bottom: 0.85rem;
		padding: 0.35rem 0.9rem;
		border: 2px solid var(--fair-accent);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.4);
		background: rgba(8, 12, 18, 0.65);
	}

	.celebration-subtitle {
		font-family: "Lora", serif;
		font-size: 1.05rem;
		color: var(--fair-accent);
		margin: 0 0 1rem;
		font-style: italic;
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
		width: min(200px, 60%);
		height: 6px;
		margin: 1.25rem auto 0;
		background: repeating-linear-gradient(
			90deg,
			#ff6b6b 0 24px,
			#ffd93d 24px 48px,
			#6bcb77 48px 72px,
			#4d96ff 72px 96px
		);
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.35);
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
		padding: 3rem 0.75rem 4rem;
	}

	.celebration-article {
		padding: 1.5rem 1.25rem 2rem;
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
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
