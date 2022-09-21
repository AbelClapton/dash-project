<script setup>
import { ref, onMounted, nextTick } from 'vue'

defineProps({
	modelValue: {
		type: [String, Number],
		default: '',
	},
})
defineEmits(['close'])

const searchInput = ref(null)

onMounted(() => {
	nextTick(() => {
		searchInput.value.focus()
	})
})
</script>

<template>
	<div
		class="absolute -bottom-1 left-0 z-10 w-full h-16 bg-gray-800 flex items-center px-3"
		ref="searchDiv"
	>
		<MagnifyingGlassIcon class="h-7 w-7 p-1 rounded text-gray-400" />
		<input
			class="bg-gray-800 border-0 outline-0 h-full flex-grow pl-3"
			type="text"
			ref="searchInput"
			placeholder="Buscar por nombre"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
		<XMarkIcon
			class="h-7 w-7 p-1 rounded text-gray-400"
			@click="$emit('close')"
		/>
	</div>
</template>
