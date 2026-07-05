<template>
	<div class="celebration-prose" v-html="html"></div>
</template>

<script>
import { renderCelebrationMarkdown } from "@/utils/celebrationMarkdown"

export default {
	name: "CelebrationProse",
	props: {
		text: {
			type: String,
			default: ""
		}
	},
	computed: {
		html() {
			return renderCelebrationMarkdown(this.text)
		}
	}
}
</script>

<style scoped lang="scss">
.celebration-prose {
	font-family: "Lora", serif;
	font-size: 1rem;
	line-height: 1.85;
	color: var(--fair-text);

	:deep(h1),
	:deep(h2),
	:deep(h3) {
		font-family: "Playfair Display", serif;
		color: var(--fair-text);
		line-height: 1.35;
		margin: 1.75rem 0 0.75rem;

		&:first-child {
			margin-top: 0;
		}
	}

	:deep(h1) {
		font-size: 1.6rem;
	}

	:deep(h2) {
		font-size: 1.35rem;
	}

	:deep(h3) {
		font-size: 1.15rem;
		color: var(--fair-accent);
	}

	:deep(p) {
		margin: 0 0 1rem;
	}

	:deep(blockquote) {
		margin: 0 0 1rem;
		padding: 0.75rem 1rem;
		border-left: 4px solid var(--fair-accent);
		color: var(--fair-muted);
		font-style: italic;
		background: rgba(255, 255, 255, 0.03);
	}

	:deep(a) {
		color: var(--fair-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	:deep(strong) {
		color: var(--fair-text);
		font-weight: 700;
	}
}
</style>
