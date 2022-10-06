<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheFooter from '@/components/TheFooter.vue'

// data
const route = useRoute()
const showFooter = computed(() => !route.meta.hideFooter)
</script>

<template>
	<div class="h-full w-full flex flex-col">
		<!-- Main View -->
		<div class="h-[92.5%] p-4 text-white">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>

		<!-- Navigation Bar -->
		<TheFooter class="h-[7.5%]" v-if="showFooter" />
	</div>
</template>

<style>
html {
	@apply h-screen;
}

body {
	@apply h-full bg-gray-900;
}

#app {
	@apply h-full;
}
</style>
