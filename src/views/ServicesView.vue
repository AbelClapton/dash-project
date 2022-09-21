<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useServicesStore } from '@/stores/services.js'
import { PlusIcon } from '@heroicons/vue/24/outline'
import BaseInput from '@/components/base/BaseInput.vue'

const servicesStore = useServicesStore()

const isModalOpen = ref(false)
const service = ref({
	name: '',
})

const modal = ref(null)

const create = () => {
	isModalOpen.value = true
}

const save = async () => {
	await servicesStore.save({ name: service.value.name })
	reset()
}

const reset = () => {
	service.value.name = ''
	isModalOpen.value = false
}

onClickOutside(modal, reset)

onMounted(() => {
	servicesStore.fetchAll()
})
</script>

<template>
	<div class="h-full w-full pb-24">
		<div class="flex items-center justify-between mb-4">
			<div class="text-lg font-semibold h-5">Servicios</div>
			<button @click="create">
				<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
			</button>
		</div>
		<div class="flex justify-between items-center h-full">
			<div
				class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden h-full w-screen my-2"
			>
				<transition-group name="list">
					<div
						class="flex justify-between items-center p-4 bg-slate-800 rounded"
						v-for="service in servicesStore.services"
						:key="service.id"
						@click="$router.push({ path: `/services/${service.id}` })"
					>
						<span>{{ service.name }}</span>
					</div>
				</transition-group>
			</div>
		</div>

		<Teleport to="#modal">
			<div
				class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
				v-if="isModalOpen"
			>
				<div class="relative bg-gray-800 p-10 rounded shadow-sm" ref="modal">
					<div class="flex flex-col gap-2">
						<div class="text-lg font-medium text-white">Nuevo Servicio</div>
						<BaseInput
							v-model="service.name"
							placeholder="Nombre del servicio"
						/>
						<button
							class="bg-cyan-500 text-lg font-medium text-white py-3 px-6 rounded-lg"
							@click="save"
						>
							Guardar
						</button>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>
