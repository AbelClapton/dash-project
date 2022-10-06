<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
	event: Object,
})

const styleObject = ref({
	height: '100px',
	top: 0,
})

const calculateTop = () => {
	const sh = parseInt(props.event.start.slice(0, 2))
	return `${4 + (sh - 8) * 3.25}rem`
	//return `${(sh - 8) * 8}rem`
}

const calculateHeight = () => {
	const diff = getDiff(props.event.start, props.event.end)
	const h = (diff / (15 * 60 * 1000)) * 0.8
	return `${h}rem`
}

function getDiff(start, end) {
	const s = new Date(`2000-01-01T${start}:00`)
	const e = new Date(`2000-01-01T${end}:00`)

	return e - s
}

onMounted(() => {
	styleObject.value.height = calculateHeight()
	styleObject.value.top = calculateTop()
})
</script>

<template>
	<div class="w-full" :style="styleObject">
		<div
			class="h-full w-full bg-cyan-500 rounded flex items-center justify-center"
		>
			<span class="text-center">
				{{ event.title }}
			</span>
		</div>
	</div>
</template>
