<script setup>
defineProps({
	label: {
		type: String,
		default: '',
	},
})
</script>

<template>
	<button
		class="flex items-center justify-start text-gray-400 gap-4"
		:class="[label ? 'py-3 pl-4 pr-8' : 'p-1']"
	>
		<slot></slot>
		<span class="font-light" v-if="label">{{ label }}</span>
	</button>
</template>
