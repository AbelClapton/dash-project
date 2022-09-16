<script setup>
import ViewActions from '@/components/ViewActions.vue'

defineProps({
	title: {
		type: String,
		default: 'View Title',
	},
	actions: {
		type: Array,
		default() {
			return []
		},
	},
	altActions: {
		type: Array,
		default() {
			return []
		},
	},
	alt: {
		type: Boolean,
		default: false,
	},
})
</script>

<template>
	<div class="h-full pb-24">
		<!-- View Header -->
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">{{ title }}</div>
			<transition name="fade" mode="out-in">
				<ViewActions v-if="!alt" :actions="actions" />
				<ViewActions v-else :actions="altActions" />
			</transition>
		</div>
		<!-- End of View Header -->

		<!-- View Content -->
		<div class="h-full w-full flex items-center justify-center pt-4">
			<slot></slot>
		</div>
		<!-- End of View Content -->
	</div>
</template>
