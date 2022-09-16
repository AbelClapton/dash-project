<script setup>
import ViewActionsButton from '@/components/ViewActionsButton.vue'
import ViewActionsMenu from './ViewActionsMenu.vue'

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
	<div class="flex items-center justify-center gap-1">
		<div v-for="(action, index) in actions" :key="index">
			<ViewActionsMenu v-if="action.actions" :action="action" />
			<ViewActionsButton v-else :action="action" />
		</div>
	</div>
</template>
