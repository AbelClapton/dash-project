<script setup>
import { ref, onMounted } from 'vue'
const markers = ref([])

const initializeMarkers = () => {
	// from 01:00 to 23:00
	for (let h = 1; h < 23; h++) {
		let H = h

		// format hour
		if (H < 10) H = `0${H}`

		// save and push
		const marker = `${H}:00`
		markers.value.push(marker)
	}
}
onMounted(() => {
	initializeMarkers()
})
</script>

<template>
	<div class="flex flex-col gap-[1.75rem]">
		<div
			class="font-light text-sm text-gray-400"
			v-for="(marker, index) in markers"
			:key="index"
		>
			{{ marker }}
		</div>
	</div>
</template>
