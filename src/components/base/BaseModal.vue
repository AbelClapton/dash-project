<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
	modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const modal = ref(null)
const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})

onClickOutside(modal, () => (isOpen.value = false))
</script>

<template>
	<Teleport to="#modal">
		<div
			class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
			v-if="isOpen"
		>
			<div class="relative bg-gray-800 p-10 rounded shadow-sm" ref="modal">
				<slot></slot>
			</div>
		</div>
	</Teleport>
</template>
