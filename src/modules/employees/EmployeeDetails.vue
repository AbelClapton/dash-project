<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

// custom components
import ViewActions from '@/components/ViewActions.vue'
import ViewActionsMenu from '@/components/ViewActionsMenu.vue'
import ViewActionsButton from '@/components/ViewActionsButton.vue'

// custom composables
import { useEmployeesStore } from '@/modules/employees/store'
import { useServicesStore } from '@/modules/services/store'

// init plugins
const employeesStore = useEmployeesStore()
const servicesStore = useServicesStore()
const router = useRouter()

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const employee = computed(() => {
	return employeesStore.get(props.id)
})

const services = computed(() => {
	return employee.value.services.map((s) => servicesStore.get(s))
})

const edit = () => {
	router.push({ path: `/employees/${employee.value.id}/edit` })
}

const remove = () => {
	employeesStore.delete(employee.value.id)
	router.back()
}
</script>

<template>
	<base-view>
		<template #actions>
			<view-actions>
				<view-actions-menu>
					<view-actions-button label="Editar" @click="edit">
						<pencil-icon class="h-5 w-5" />
					</view-actions-button>
					<view-actions-button label="Remover" @click="remove">
						<trash-icon class="h-5 w-5 text-red-500" />
					</view-actions-button>
				</view-actions-menu>
			</view-actions>
		</template>

		<template #content>
			<div class="px-4 h-full flex flex-col gap-3">
				<div>
					<base-avatar :user="employee" />
				</div>
				<div>Telefono: {{ employee.phone }}</div>
				<div class="relative flex border border-gray-500 py-3 px-4">
					<span class="absolute -mt-6 -ml-1 px-1 bg-slate-900"> Habilidades </span>
					<div v-if="services.length">
						<div v-for="service in services" :key="service.id">
							{{ service.name }} - {{ service.category }}
						</div>
					</div>
					<div v-else>No atiende ningun servicio</div>
				</div>
			</div>
		</template>
	</base-view>
</template>
