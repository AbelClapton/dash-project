<script setup>
import { computed } from 'vue'

const props = defineProps({
	event: Object,
})

const top = computed(() => {
	const [h, m] = props.event.start.split(':').map((e) => parseInt(e))
	return `${h * 3 + m * 0.05}rem`
})

const height = computed(() => {
	const diff = getDiff(props.event.start, props.event.end)
	const h = (diff / (15 * 60 * 1000)) * 0.75
	return `${h}rem`
})

function getDiff(start, end) {
	const s = new Date(`2000-01-01T${start}:00`)
	const e = new Date(`2000-01-01T${end}:00`)

	return e - s
}
</script>

<template>
	<div class="w-full p-[0.0375rem]" :style="{ top, height }">
		<div
			class="h-full w-full bg-cyan-500 rounded flex items-center justify-center text-sm"
		>
			<span class="text-center text-sm">
				{{ event.title }}
			</span>
			<span class="text-center text-sm">
				{{ styleObject.top }}
			</span>
		</div>
	</div>
</template>
