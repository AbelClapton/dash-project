<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// data
const route = useRoute()
const showFooter = computed(() => !route.meta.hideFooter)
</script>

<template>
	<div class="h-full w-full flex flex-col">
		<!-- Main View -->
		<div class="h-full text-white">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<style>
*::-webkit-scrollbar {
	display: none;
}

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
