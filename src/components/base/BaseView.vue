<script setup>
import { ref } from 'vue'
import ViewActions from '@/components/ViewActions.vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import TheNavbar from '@/components/TheNavbar.vue'

defineProps({
	actions: {
		type: Array,
		default() {
			return []
		},
	},
})

const showNavbar = ref(false)
</script>

<template>
	<div class="h-full flex flex-col gap-6">
		<!-- View Header -->
		<div class="h-8 flex items-center justify-start gap-2">
			<button class="py-1 rounded-full" @click="showNavbar = true">
				<Bars3Icon class="h-7 w-7 text-gray-400" />
			</button>
			<div
				class="flex-grow text-lg font-semibold h-5 flex items-center justify-start"
			>
				<slot name="header">View Name</slot>
			</div>
			<ViewActions :actions="actions" />
		</div>

		<!-- View Content -->
		<div class="h-full container mx-auto overflow-hidden">
			<slot></slot>
		</div>
		<TheNavbar
			v-if="showNavbar"
			class="absolute left-0 top-0 bottom-0 z-20"
			@close="showNavbar = false"
		/>
	</div>
</template>
