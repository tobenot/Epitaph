<template>
	<div class="confetti-rain" aria-hidden="true">
		<span
			v-for="piece in pieces"
			:key="piece.id"
			class="confetti-piece"
			:style="piece.style"
		></span>
	</div>
</template>

<script>
const COLORS = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ffc878", "#e8eef4"]

function randomBetween(min, max) {
	return min + Math.random() * (max - min)
}

function pickColor() {
	return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export default {
	name: "CelebrationConfettiRain",
	data() {
		return {
			pieces: []
		}
	},
	created() {
		this.pieces = Array.from({ length: 24 }, (_, id) => {
			const isWide = Math.random() > 0.75
			const width = isWide ? randomBetween(8, 14) : randomBetween(3, 6)
			const height = isWide ? randomBetween(10, 16) : randomBetween(16, 32)
			return {
				id,
				style: {
					left: `${randomBetween(0, 100)}%`,
					width: `${width}px`,
					height: `${height}px`,
					backgroundColor: pickColor(),
					"--ribbon-spin": `${randomBetween(-35, 35)}deg`,
					animationDuration: `${randomBetween(10, 20)}s`,
					animationDelay: `${randomBetween(-20, 0)}s`,
					opacity: randomBetween(0.35, 0.65).toFixed(2)
				}
			}
		})
	}
}
</script>

<style scoped lang="scss">
.confetti-rain {
	position: relative;
	height: 5.5rem;
	margin: 0 -0.75rem 0.75rem;
	overflow: hidden;
	pointer-events: none;
}

.confetti-piece {
	position: absolute;
	top: -0.5rem;
	display: block;
	transform: rotate(var(--ribbon-spin, 0deg));
	animation-name: confetti-fall;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	will-change: transform;
}

@keyframes confetti-fall {
	0% {
		transform: translate3d(0, -0.5rem, 0) rotate(var(--ribbon-spin, 0deg));
	}

	25% {
		transform: translate3d(12px, 1.5rem, 0) rotate(calc(var(--ribbon-spin, 0deg) + 180deg));
	}

	50% {
		transform: translate3d(-8px, 3rem, 0) rotate(calc(var(--ribbon-spin, 0deg) + 360deg));
	}

	75% {
		transform: translate3d(10px, 4.5rem, 0) rotate(calc(var(--ribbon-spin, 0deg) + 540deg));
	}

	100% {
		transform: translate3d(-6px, 7rem, 0) rotate(calc(var(--ribbon-spin, 0deg) + 720deg));
	}
}

@media (prefers-reduced-motion: reduce) {
	.confetti-piece {
		animation: none;
		display: none;
	}
}
</style>
