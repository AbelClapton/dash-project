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
		<!-- End of Main View -->
		<!-- Navigation Bar -->
		<div
			class="bg-slate-700 text-white w-full pt-4 pb-7 px-4 absolute -bottom-1 left-0 flex"
			v-if="windowHeight > 600"
		>
			<button @click="isMenuOpen = true">
				<MenuIcon class="h-5 w-5" />
			</button>
		</div>
		<!-- End of Navigation Bar -->
		<!-- Menu Panel -->
		<MenuView :isOpen="isMenuOpen" @close="isMenuOpen = false" />
		<!-- End of Menu Panel -->
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useProductsStore } from '@/data/products.js'
import { useBrandsStore } from '@/data/brands.js'
import { useCategoriesStore } from '@/data/categories.js'
import { MenuIcon } from '@heroicons/vue/outline'
import MenuView from '@/views/MenuView.vue'

const productsStore = useProductsStore()
const brandsStore = useBrandsStore()
const categoriesStore = useCategoriesStore()

const isMenuOpen = ref(false)
const windowHeight = ref(window.innerHeight)

onMounted(() => {
	productsStore.init()
	brandsStore.init()
	categoriesStore.init()
	nextTick(() => {
		window.addEventListener('resize', onResize)
	})
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', onResize)
	productsStore.unsubsribe()
	brandsStore.unsubsribe()
	categoriesStore.unsubsribe()
})

const onResize = () => {
	windowHeight.value = window.innerHeight
}
</script>

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
