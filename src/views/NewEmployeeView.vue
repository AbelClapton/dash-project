<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployeesStore } from '@/stores/employees.js'
import { useServicesStore } from '@/stores/services.js'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseListBox from '@/components/base/BaseListBox.vue'

const employeesStore = useEmployeesStore()
const servicesStore = useServicesStore()

const employee = ref({
	name: '',
	phone: '',
	services: [],
})

const route = useRoute()
const router = useRouter()

const save = async () => {
	if (route.params.id) await employeesStore.update(employee.value)
	else await employeesStore.save(employee.value)
	router.back()
}

onMounted(() => {
	if (!servicesStore.services.length) servicesStore.fetchAll()
	if (!employeesStore.employees.length) employeesStore.fetchAll()
	if (route.params.id) employee.value = employeesStore.get(route.params.id)
})
</script>

<template>
	<div>
		<h1 class="font-medium text-lg">
			{{ route.params.id ? 'Editar' : 'Nuevo' }} Empleado
		</h1>
		<br />
		<form
			class="p-2 flex flex-col justify-between gap-4"
			@submit.prevent="save"
		>
			<div class="flex flex-col gap-4">
				<BaseInput
					label="Nombre"
					type="text"
					placeholder="Nombre del empleado"
					v-model="employee.name"
				/>
				<BaseInput
					label="Teléfono"
					type="text"
					placeholder="Teléfono"
					v-model="employee.phone"
				/>
				<BaseListBox
					label="Servicios"
					:options="servicesStore.services"
					v-model="employee.services"
					multiple
					placeholder="Seleccionar servicios"
				/>
			</div>
			<div class="text-end pt-6">
				<input
					class="bg-cyan-500 text-lg font-medium text-white py-3 px-6 rounded-lg"
					type="submit"
					value="Guardar"
				/>
			</div>
		</form>
	</div>
</template>
