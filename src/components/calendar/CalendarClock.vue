<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const timer = ref(null)
const time = ref(null)

onMounted(() => {
	timer.value = setInterval(() => {
		time.value = Intl.DateTimeFormat(navigator.language, {
			hour: 'numeric',
			minute: 'numeric',
		}).format()
	}, 1000)
})

onUnmounted(() => {
	clearInterval(timer.value)
})
</script>

<template>
	<div>{{ time }}</div>
</template>
