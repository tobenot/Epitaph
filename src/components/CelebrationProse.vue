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
	overflow: visible;

	:deep(h1),
	:deep(h2),
	:deep(h3) {
		font-family: "Playfair Display", serif;
		color: var(--fair-text);
		line-height: 1.35;
		margin: 1.75rem 0 0.75rem;
		clear: none;

		&:first-child {
			margin-top: 0;
		}
	}

	:deep(h1) {
		font-size: 1.6rem;
	}

	:deep(h2) {
		font-size: 1.35rem;
		padding-left: 0.85rem;
		border-left: 6px solid var(--fair-accent);
		box-shadow: -3px 0 0 rgba(255, 107, 107, 0.35);
	}

	:deep(h3) {
		font-size: 1.15rem;
		color: var(--fair-accent);
	}

	:deep(p) {
		margin: 0 0 1rem;
	}

	:deep(ul) {
		margin: 0 0 1rem;
		padding-left: 1.35rem;
		list-style-type: "▪  ";
		list-style-position: outside;
	}

	:deep(ul ul) {
		margin: 0.45rem 0 0.15rem;
		padding-left: 1.1rem;
		border-left: 3px solid rgba(255, 200, 120, 0.35);
		list-style-type: "–  ";
	}

	:deep(li) {
		display: list-item;
		margin-bottom: 0.55rem;
		padding-left: 0.2rem;
		line-height: 1.75;

		&::marker {
			color: var(--fair-accent);
		}

		&:last-child {
			margin-bottom: 0;
		}
	}

	:deep(ul ul li)::marker {
		color: rgba(255, 200, 120, 0.75);
	}

	:deep(.celebration-dialog) {
		margin: 0 0 1.1rem;
		padding: 0.65rem 0.85rem 0.55rem;
		border-left: 3px solid rgba(255, 200, 120, 0.5);
		background: rgba(0, 0, 0, 0.14);
	}

	:deep(.dialog-line) {
		display: flex;
		gap: 0.55rem;
		align-items: baseline;
		margin: 0 0 0.7rem;
		line-height: 1.72;

		&:last-child {
			margin-bottom: 0;
		}
	}

	:deep(.dialog-speaker) {
		flex-shrink: 0;
		color: var(--fair-accent);
		font-weight: 600;
		white-space: nowrap;
	}

	:deep(.dialog-body) {
		flex: 1;
		min-width: 0;
		color: var(--fair-text);
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

@media (max-width: 520px) {
	.celebration-prose {
		:deep(.dialog-line) {
			flex-direction: column;
			gap: 0.15rem;
			margin-bottom: 0.85rem;
		}

		:deep(.dialog-speaker) {
			white-space: normal;
		}
	}
}
</style>
