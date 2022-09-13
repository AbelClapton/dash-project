<script setup>
import { onMounted } from 'vue'
import { useEmployeesStore } from '@/data/employees.js'
import {
	PlusIcon,
	EllipsisVerticalIcon,
	PhoneIcon,
} from '@heroicons/vue/24/outline'

const employeesStore = useEmployeesStore()

onMounted(() => {
	employeesStore.fetchAll()
})
</script>

<template>
	<div class="h-full pb-20">
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">Empleados</div>
			<div class="flex items-center gap-2">
				<router-link to="/add-employee">
					<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</router-link>
				<EllipsisVerticalIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
			</div>
		</div>
		<div class="flex items-center justify-center h-full">
			<div v-if="employeesStore.employees.length" class="w-full h-full pt-3">
				<transition-group name="list">
					<div
						v-for="employee in employeesStore.employees"
						:key="employee.id"
						class="py-2 px-3 rounded bg-slate-800"
						@click="$router.push({ path: `/employees/${employee.id}` })"
					>
						<span class="font-regular"> {{ employee.name }} </span>
						<div class="flex items-center gap-2">
							<PhoneIcon class="h-4 w-4" />
							<span class="font-regular"> {{ employee.phone }} </span>
						</div>
					</div>
				</transition-group>
			</div>
			<div v-else class="text-gray-500">No existen empleados registrados.</div>
		</div>
	</div>
</template>
