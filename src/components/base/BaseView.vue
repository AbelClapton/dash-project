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
	<div class="h-full flex flex-col gap-6">
		<!-- View Header -->
		<div class="h-8 flex items-center justify-between">
			<div class="text-lg font-semibold h-5">
				<slot name="header">View Name</slot>
				<ViewActions :actions="actions" />
			</div>
		</div>

		<!-- View Content -->
		<div class="h-full container mx-auto overflow-hidden">
			<slot></slot>
		</div>
	</div>
</template>
