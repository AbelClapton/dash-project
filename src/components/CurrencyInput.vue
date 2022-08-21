<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	label: {
		type: [String, Boolean],
		default: 'false',
	},
	modelValue: {
		type: Number,
		default: 0,
	},
})

const isInputActive = ref(false)

const displayValue = computed(() => {
	return {
		get: function () {
			if (isInputActive.value) {
				return props.modelValue.toString()
			} else {
				return props.modelValue
					.toFixed(2)
					.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
			}
		},
		set: function (modifiedValue) {
			let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ''))
			if (isNaN(newValue)) {
				newValue = 0
			}
		},
	}
})
</script>

<template>
	<div>
		<label class="font-light" v-if="label">{{ label }}:</label>
		<input
			class="pl-3 py-2 text-lg text-black font-light w-full border rounded-lg"
			type="text"
			v-model="displayValue"
			@blur="isInputActive = false"
			@focus="isInputActive = true"
			@input="$emit('update:modelValue', $event.target.value)"
			autocomplete="off"
			v-bind="$attrs"
		/>
	</div>
</template>
