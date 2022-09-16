<script setup>
defineProps({
	action: Object,
	expand: {
		type: Boolean,
		default: false,
	},
})
</script>

<template>
	<button
		class="flex items-center justify-start text-gray-400 gap-4"
		:class="[expand ? 'py-3 pl-4 pr-8' : 'p-1']"
		@click="action.action"
	>
		<component :is="action.icon" class="h-6 w-6" :class="action.iconStyle" />
		<span class="font-light" v-if="expand">{{ action.label }}</span>
	</button>
</template>
