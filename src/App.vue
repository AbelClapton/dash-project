<script setup>
import { ref, onMounted } from 'vue'
import { useBrandsStore } from '@/modules/brands/store'
import TheNavbar from '@/components/TheNavbar.vue'

const showNavbar = ref(false)

onMounted(async () => {
	const brandsStore = useBrandsStore()

	brandsStore.fetchAll()
})
</script>

<template>
	<div class="h-full w-full flex flex-col">
		<!-- Main View -->
		<main class="h-full text-white overflow-hidden bg-gray-900">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<keep-alive>
						<component
							:is="Component"
							@toggleNavbar="showNavbar = !showNavbar"
						/>
					</keep-alive>
				</transition>
			</router-view>
		</main>
	</div>

	<TheNavbar v-show="showNavbar" @dispose="showNavbar = false" />
</template>

<style>
*::-webkit-scrollbar {
	display: none;
}

html {
	height: 100%;
}

body {
	background-color: rgb(17 24 39);
	height: 100%;
	overscroll-behavior: contain;
}

#app {
	height: 100%;
}
</style>
