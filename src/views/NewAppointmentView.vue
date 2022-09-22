<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { useClientsStore } from '@/stores/clients.js'
import { useServicesStore } from '@/stores/services.js'
import { useModulesStore } from '@/stores/modules.js'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseListBox from '@/components/base/BaseListBox.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const appointment = ref({
	client: {
		name: '',
		phone: '',
	},
	start_time: new Date(),
	end_time: new Date(),
	modules: [],
})

const route = useRoute()
const router = useRouter()

const appointmentsStore = useAppointmentsStore()
const clientsStore = useClientsStore()
const servicesStore = useServicesStore()
const modulesStore = useModulesStore()

const save = async () => {
	await appointmentsStore.save(appointment.value)
	router.back()
}

const modules = computed(() =>
	modulesStore.modules.map((m) => {
		m.name = `${m.name} - ${servicesStore.get(m.service).name}`
		return m
	})
)

onMounted(async () => {
	if (!appointmentsStore.appointments.length) await appointmentsStore.fetchAll()
	if (!clientsStore.clients.length) await clientsStore.fetchAll()
	if (!servicesStore.services.length) await servicesStore.fetchAll()
	if (!modulesStore.modules.length) await modulesStore.fetchAll()
})
</script>

<template>
	<div>
		<h1 class="font-medium text-lg">
			{{ route.params.id ? 'Editar' : 'Nueva' }} Reservación
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
					placeholder="Nombre del cliente"
					v-model="appointment.client.name"
				/>
				<BaseInput
					label="Teléfono"
					type="text"
					placeholder="Teléfono"
					v-model="appointment.client.phone"
				/>
				<BaseListBox
					label="Servicios"
					:options="modules"
					v-model="appointment.modules"
					multiple
					placeholder="Seleccionar servicios"
				/>
				<Datepicker
					v-model="appointment.start_time"
					placeholder="Start Typing ..."
					utc
					autoApply
				>
					<template #dp-input="{ value }">
						<BaseInput label="Fecha inicio" :value="value" />
					</template>
				</Datepicker>
				<Datepicker
					v-model="appointment.end_time"
					placeholder="Start Typing ..."
					utc
					autoApply
				>
					<template #dp-input="{ value }">
						<BaseInput label="Fecha de fin" :value="value" />
					</template>
				</Datepicker>
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
