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
		this.pieces = Array.from({ length: 36 }, (_, id) => {
			const size = randomBetween(5, 11)
			return {
				id,
				style: {
					left: `${randomBetween(0, 100)}%`,
					width: `${size}px`,
					height: `${size}px`,
					backgroundColor: pickColor(),
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
	position: fixed;
	inset: 0;
	overflow: hidden;
	pointer-events: none;
	z-index: 1;
}

.confetti-piece {
	position: absolute;
	top: -5vh;
	display: block;
	animation-name: confetti-fall;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	will-change: transform;
}

@keyframes confetti-fall {
	0% {
		transform: translate3d(0, -5vh, 0) rotate(0deg);
	}

	25% {
		transform: translate3d(12px, 25vh, 0) rotate(180deg);
	}

	50% {
		transform: translate3d(-8px, 50vh, 0) rotate(360deg);
	}

	75% {
		transform: translate3d(10px, 75vh, 0) rotate(540deg);
	}

	100% {
		transform: translate3d(-6px, 105vh, 0) rotate(720deg);
	}
}

@media (prefers-reduced-motion: reduce) {
	.confetti-piece {
		animation: none;
		display: none;
	}
}
</style>
