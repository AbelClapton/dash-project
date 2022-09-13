<script setup>
import Toast from '@/components/base/BaseToast.vue'
import { useToastsStore } from '@/data/toasts.js'

const toastsStore = useToastsStore()
</script>

<template>
	<transition name="fade-in">
		<div
			class="flex flex-col items-end gap-2 fixed right-0 bottom-16"
			v-if="toastsStore.toasts.length"
			v-auto-animate
		>
			<Toast
				v-for="(toast, index) of toastsStore.toasts"
				:key="index"
				:toast="toast"
			></Toast>
		</div>
	</transition>
</template>

<style>
.fade-in-enter-from,
.fade-in-leave-to {
	opacity: 0;
	transform: scale(0.5);
}

.fade-in-enter-active,
.fade-in-leave-active {
	transition: all 0.3s ease;
}
</style>
