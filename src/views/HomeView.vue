<script setup>
import { useToastsStore } from '@/data/toasts.js'

const toastsStore = useToastsStore()
const addToast = () => {
	toastsStore.addToast({
		title:`Hello Vuex! ${toastsStore.toasts.length}`,
		type: 'success',
		message: 'It looks like you have successfully set up Vuex.',
	})
}
</script>

<template>
	<main class="flex flex-col">Main View</main>
	<button @click="addToast">x</button>
</template>
