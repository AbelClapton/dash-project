<script setup>
import { useRoute } from 'vue-router'
import { Bars3Icon } from '@heroicons/vue/24/outline'

// data
const route = useRoute()
</script>

<template>
	<div class="h-full w-full flex flex-col">
		<!-- Header -->
		<div class="flex items-center p-4 text-white gap-2">
			<Bars3Icon class="h-7 w-7" />
			<h3 class="text-xl flex-grow">{{ route.name }}</h3>
		</div>

		<!-- Main View -->
		<main class="h-full text-white overflow-hidden">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
	</div>
</template>

<style>
*::-webkit-scrollbar {
	display: none;
}

html {
	@apply h-full;
}

body {
	@apply h-full bg-gray-900;
}

#app {
	@apply h-full;
}
</style>
