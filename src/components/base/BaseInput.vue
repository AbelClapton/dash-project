<script setup>
defineProps({
	label: {
		type: [String, Boolean],
		default: 'false',
	},
	modelValue: {
		type: [String, Number],
		default: '',
	},
})
</script>

<template>
	<div class="">
		<label v-if="label">{{ label }}:</label>
		<input
			class="pl-3 py-2 text-lg w-full border rounded-lg"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			autocomplete="off"
			v-bind="$attrs"
		/>
	</div>
</template>
