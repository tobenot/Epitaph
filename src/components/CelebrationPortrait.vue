<template>
	<figure class="celebration-portrait" :class="[`align-${align}`]">
		<div class="portrait-slot">
			<img v-if="character?.portrait" :src="character.portrait" :alt="name">
			<div v-else class="portrait-placeholder" aria-hidden="true"></div>
		</div>
		<figcaption v-if="name || role">
			<span class="portrait-name" v-if="name">{{ name }}</span>
			<span class="portrait-role" v-if="role">{{ role }}</span>
		</figcaption>
	</figure>
</template>

<script>
import { pickLocalized } from "@/utils/celebration"

export default {
	name: "CelebrationPortrait",
	props: {
		character: {
			type: Object,
			default: null
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
		name() {
			return pickLocalized(this.character?.nameKey, this.locale)
		},
		role() {
			return pickLocalized(this.character?.roleKey, this.locale)
		}
	}
}
</script>

<style scoped lang="scss">
.celebration-portrait {
	margin: 0 0 1.25rem;
	width: min(200px, 42vw);

	.portrait-slot {
		aspect-ratio: 2 / 3;
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid rgba(255, 200, 120, 0.35);
		background: rgba(10, 14, 20, 0.6);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top center;
			display: block;
		}
	}

	.portrait-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(
			180deg,
			rgba(255, 180, 100, 0.2) 0%,
			rgba(60, 90, 130, 0.35) 100%
		);
	}

	figcaption {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin-top: 0.5rem;
		text-align: center;
	}

	.portrait-name {
		font-family: "Playfair Display", serif;
		font-size: 0.95rem;
		color: var(--fair-text);
	}

	.portrait-role {
		font-family: "Lora", serif;
		font-size: 0.75rem;
		color: var(--fair-muted);
	}

	&.align-left {
		float: left;
		margin-right: 1.5rem;
	}

	&.align-right {
		float: right;
		margin-left: 1.5rem;
	}

	&.align-center {
		margin-left: auto;
		margin-right: auto;
		clear: both;
	}
}

@media (max-width: 600px) {
	.celebration-portrait {
		float: none !important;
		width: min(180px, 70vw);
		margin-left: auto;
		margin-right: auto;
	}
}
</style>
