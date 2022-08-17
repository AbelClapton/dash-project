<template>
	<!-- Main View -->
	<div class="p-4 text-white">
		<div class="flex justify-between">
			<div class="text-lg font-semibold">Hoy</div>
			<div class="flex gap-2">
				<DotsVerticalIcon class="h-5 w-5" />
			</div>
		</div>
		<div>
			<Transition name="fade" mode="out-in">
				<router-view />
			</Transition>
		</div>
	</div>
	<!-- End of Main View -->

	<!-- Navigation Bar -->
	<div
		class="bg-slate-700 text-white w-full pt-4 pb-7 px-4 fixed bottom-0 left-0 flex"
	>
		<button @click="isMenuOpen=true">
			<MenuIcon class="h-5 w-5" />
		</button>
	</div>
	<!-- End of Navigation Bar -->

	<!-- Menu Panel -->
	<Transition name="slide">
		<div v-if="isMenuOpen">
			<div
				class="absolute h-screen w-screen flex justify-between items-start p-4 bg-slate-700 top-0"
			>
				<div class="flex flex-col gap-2">
					<router-link to="#">Inventario</router-link>
					<router-link to="#">Finanzas</router-link>
					<router-link to="#">Calendario</router-link>
				</div>
				<button @click="isMenuOpen = false">x</button>
			</div>
		</div>
	</Transition>
	<!-- End of Menu Panel -->
</template>

<script setup>
import { ref } from 'vue'
import { DotsVerticalIcon, MenuIcon } from '@heroicons/vue/outline'

const isMenuOpen = ref(false)
</script>

<style>
body {
	overflow: hidden;
}

#app {
	@apply h-screen w-screen bg-slate-800;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateY(100%);
}

.slide-enter-to,
.slide-leave-from {
	transform: translateY(0);
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s ease-in-out;
}
</style>
