<script setup>
import { ref } from 'vue'

defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
})
defineEmits(['close'])

// data
const appointment = ref({
	module: '',
	client: {
		name: '',
		phone: '',
	},
	date: new Date(),
	start: new Date(),
	end: new Date(),
})
</script>

<template>
	<BaseView>
		<template #header> Hoy </template>
		<template>
			<div class="flex flex-wrap">
				<BaseInput label="Nombre" v-model="appointment.client.name" />
				<BaseInput label="Teléfono" v-model="appointment.client.phone" />
			</div>
		</template>
	</BaseView>
</template>
