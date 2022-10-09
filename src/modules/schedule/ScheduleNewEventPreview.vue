<script setup>
import { ref, computed } from 'vue'
import { useSwipe } from '@vueuse/core'

const props = defineProps({
	modelValue: {
		type: Object,
		default: () => ({}),
	},
})

const event = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})

const emit = defineEmits(['input'])

const top = computed(() => {
	const [h, m] = event.value.start.split(':').map((e) => parseInt(e))
	return `${h * 3 + m * 0.05}rem`
})

const height = computed(() => {
	const diff = getDiff(event.value.start, event.value.end)
	const h = (diff / (15 * 60 * 1000)) * 0.75
	return `${h}rem`
})

function getDiff(start, end) {
	const s = new Date(`2000-01-01T${start}:00`)
	const e = new Date(`2000-01-01T${end}:00`)

	return e - s
}

function addTime(time, amount) {
	const currentTime = time.split(':').map((el) => parseInt(el))

	let quarters = 0
	quarters += currentTime[0] * 4 // hours
	quarters += Math.floor(currentTime[1] / 15) // minutes
	quarters += amount

	const hours = Math.floor(quarters / 4)
	const minutes = (quarters % 4) * 15

	const HH = hours < 10 ? `0${hours}` : hours
	const MM = minutes < 15 ? `00` : minutes

	return `${HH}:${MM}`
}

// upper control resize
const upperControl = ref(null)
const {
	isSwiping: upperSwiping,
	coordsStart: upperStart,
	coordsEnd: upperEnd,
} = useSwipe(upperControl, {
	passive: false,
	threshold: 0,
	onSwipe() {
		const delta = Math.floor((upperEnd.y - upperStart.y) / 12)

		if (Math.abs(delta)) {
			upperStart.y += delta * 12
			event.value.start = addTime(event.value.start, delta)
		}
	},
})

// bottom control resize
const bottomControl = ref(null)
const {
	isSwiping: bottomSwiping,
	coordsStart: bottomStart,
	coordsEnd: bottomEnd,
} = useSwipe(bottomControl, {
	passive: false,
	threshold: 0,
	onSwipe() {
		const delta = Math.floor((bottomEnd.y - bottomStart.y) / 12)

		if (Math.abs(delta)) {
			bottomStart.y += delta * 12
			event.value.end = addTime(event.value.end, delta)
		}
	},
})

// event move
const eventDiv = ref(null)
const { coordsStart, coordsEnd } = useSwipe(eventDiv, {
	passive: false,
	threshold: 0,
	onSwipe() {
		const delta = Math.floor((coordsEnd.y - coordsStart.y) / 12)

		if (Math.abs(delta) && !upperSwiping.value && !bottomSwiping.value) {
			coordsStart.y += delta * 12
			event.value.start = addTime(event.value.start, delta)
			event.value.end = addTime(event.value.end, delta)
		}
	},
})
</script>

<template>
	<div
		class="w-full h-full border-2 border-cyan-500 rounded shadow-md shadow-black transition-all duration-100"
		:style="{ top, height }"
		ref="eventDiv"
	>
		<div class="h-full w-full relative">
			<div
				class="absolute -top-2 left-2.5 h-3.5 w-3.5 bg-cyan-900 rounded-full flex items-center justify-center"
				ref="upperControl"
			>
				<div class="h-2 w-2 bg-cyan-500 rounded-full"></div>
			</div>
			<div
				class="absolute -bottom-2 right-2.5 h-3.5 w-3.5 bg-cyan-900 rounded-full flex items-center justify-center"
				ref="bottomControl"
			>
				<div class="h-2 w-2 bg-cyan-500 rounded-full"></div>
			</div>
		</div>
	</div>
</template>
