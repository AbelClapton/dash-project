<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import MenuView from '@/views/MenuView.vue'

const isMenuOpen = ref(false)
const windowHeight = ref(window.innerHeight)

onMounted(() => {
	nextTick(() => {
		window.addEventListener('resize', onResize)
	})
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', onResize)
})

const onResize = () => {
	windowHeight.value = window.innerHeight
}
</script>

<template>
	<div
		class="min-h-full h-full w-screen transition-opacity ease-in-out"
		:class="[isMenuOpen ? 'bg-gray-900/100' : 'bg-gray-900/95']"
	>
		<!-- Main View -->
		<div class="h-full p-4 text-white">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>

		<!-- Navigation Bar -->
		<div
			class="bg-slate-700 text-white w-full pt-4 pb-7 px-4 absolute -bottom-1 left-0 flex"
			v-if="windowHeight > 600"
		>
			<button @click="isMenuOpen = true">
				<Bars3Icon class="h-5 w-5" />
			</button>
		</div>

		<!-- Menu Panel -->
		<MenuView :isOpen="isMenuOpen" @close="isMenuOpen = false" />
	</div>
</template>

<style>
html,
body {
	height: 100%;
	overflow: hidden;
}

#app {
	@apply h-full w-screen;
}
</style>
