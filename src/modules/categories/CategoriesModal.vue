<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: Object,
		default: () => {},
	},
})

const emit = defineEmits(['update:modelValue', 'save'])

const category = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})
</script>

<template>
	<div class="flex flex-col gap-2">
		<div class="text-lg font-medium text-white">
			{{ category.id ? 'Nueva' : 'Editar' }} Categoría
		</div>
		<base-input v-model="category.name" placeholder="Nombre de la categoría" />
		<button
			class="bg-cyan-500 text-lg font-medium text-white py-3 px-6 rounded-lg"
			@click="$emit('save')"
		>
			Guardar
		</button>
	</div>
</template>
