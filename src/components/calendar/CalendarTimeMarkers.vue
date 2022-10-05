<script setup>
import { ref, onMounted } from 'vue'
const markers = ref([])

const initializeMarkers = () => {
	// from 08:00 to end
	for (let i = 0, h = 8; i < 30; i++) {
		// half hour steps
		let H = h + Math.floor(i / 2)

		// format hour
		if (H < 10) H = `0${H}`

		// save and push
		const marker = `${H}:${i % 2 === 0 ? '00' : '30'}`
		markers.value.push(marker)
	}
}
onMounted(() => {
	initializeMarkers()
})
</script>

<template>
	<div>
		<div
			class="font-light odd:text-gray-500 even:text-gray-400"
			v-for="(marker, index) in markers"
			:key="index"
		>
			{{ marker }}
		</div>
	</div>
</template>
