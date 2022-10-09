<script setup>
import { ref, computed, watch } from 'vue'
import { useSwipe, useInterval } from '@vueuse/core'
import {
	XMarkIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@heroicons/vue/24/outline'

// props
defineProps({
	event: {
		type: Object,
		default: () => ({}),
	},
})
// emits
const emit = defineEmits(['dispose'])

// data
const panel = ref(null)
const top = ref(650)
const bgColor = computed(() =>
	currentBreakpoint.value ? 'bg-gray-700' : 'bg-gray-800'
)
const offsetY = ref(0)
const breakpoints = [0, 650, 775]
let currentBreakpoint = ref(1)

// TODO: make into a composable
// composables
const { counter, resume, pause } = useInterval(10, {
	controls: true,
	immediate: false,
})

const { isSwiping, direction, lengthY } = useSwipe(panel, {
	passive: false,
	onSwipeStart() {
		counter.value = 0
		resume()
	},
	onSwipe() {
		const newTop = offsetY.value - lengthY.value
		top.value = newTop > 0 ? newTop : 0
	},
	onSwipeEnd() {
		pause()
		if (counter.value < 50) nextBreakpoint(direction.value)
		else resizeToBreakpoint()
	},
})

// methods
const resizeToBreakpoint = () => {
	if (top.value < 300) currentBreakpoint.value = 0
	else if (top.value < 600) currentBreakpoint.value = 1
	else currentBreakpoint = 2
}

const nextBreakpoint = (direction) => {
	if (direction === 'DOWN' && currentBreakpoint.value < 2)
		return currentBreakpoint.value++
	if (direction === 'UP' && currentBreakpoint.value > 0)
		return currentBreakpoint.value--
}

watch(currentBreakpoint, (newBreakpoint) => {
	top.value = breakpoints[newBreakpoint]
	offsetY.value = top.value
})

const dispose = () => {
	currentBreakpoint.value = 1
	emit('dispose')
}
</script>

<template>
	<div
		class="absolute bottom-0 left-0 right-0 duration-100 ease-in-out rounded-t-3xl"
		:class="[{ 'transition-all': isSwiping }, bgColor]"
		:style="{ top: `${top}px` }"
	>
		<!-- Panel Swipe Area -->
		<div class="flex align-center justify-center" ref="panel">
			<ChevronDownIcon class="h-5 w-5" v-if="currentBreakpoint === 3" />
			<ChevronUpIcon class="h-5 w-5" v-else-if="currentBreakpoint === 1" />
			<div class="h-5 w-10 bg-gray-500" v-else></div>
		</div>

		<!-- Panel Header -->
		<div
			class="w-full flex items-center justify-between p-4 z-10"
			v-if="currentBreakpoint < 2"
		>
			<button @click="dispose">
				<XMarkIcon class="h-6 w-6" />
			</button>
			<button class="bg-cyan-500 py-1 px-3 rounded-full text-lg">
				Guardar
			</button>
		</div>

		<!-- Panel Content -->
		<div class="w-full flex flex-col px-16">
			<input
				class="bg-transparent text-2xl placeholder:text-white"
				type="text"
				placeholder="Añade un título"
			/>
			<p>Hoy - {{ event.start }} - {{ event.end }}</p>
		</div>
	</div>
</template>
