<script setup>
import ViewActions from '@/components/ViewActions.vue'

defineProps({
	actions: {
		type: Array,
		default() {
			return []
		},
	},
})
</script>

<template>
	<div class="h-full pb-24">
		<!-- View Header -->
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">
				<slot name="header">View Name</slot>
				<ViewActions :actions="actions" />
			</div>
		</div>

		<!-- View Content -->
		<div class="h-full w-full flex items-start justify-center pt-4">
			<slot></slot>
		</div>
	</div>
</template>
