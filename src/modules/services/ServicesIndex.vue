<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useServicesStore } from '@/stores/services.js'
import { ArrowPathIcon, Squares2X2Icon } from '@heroicons/vue/24/outline'

import ViewList from '@/components/ViewList.vue'
import ViewActions from '@/components/ViewActions.vue'
import ViewActionsButton from '@/components/ViewActionsButton.vue'
import ViewActionsMenu from '@/components/ViewActionsMenu.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import ServiceListItem from '@/modules/services/ServiceListItem.vue'

const servicesStore = useServicesStore()

const isModalOpen = ref(false)
const isNewService = ref(false)
const isSelecting = ref(false)
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

const fetchServices = async () => {
	await servicesStore.fetchAll()
}

onMounted(async () => {
	await fetchServices()
})
</script>

<template>
	<base-view>
		<template #header>Servicios</template>

		<template #actions>
			<view-actions>
				<view-actions-menu>
					<view-actions-button label="Actualizar" @click="fetchServices">
						<arrow-path-icon class="w-7 h-7" />
					</view-actions-button>
					<view-actions-button
						label="Categorias"
						@click="$router.push({ path: '/categories' })"
					>
						<squares-2-x-2-icon class="w-7 h-7" />
					</view-actions-button>
				</view-actions-menu>
			</view-actions>
		</template>

		<template #content>
			<div class="px-4">
				<view-list
					:items="servicesStore.services"
					:loading="servicesStore.loading"
					v-model:isSelecting="isSelecting"
				>
					<template #item-body="{ item }">
						<service-list-item
							:service="item"
							@click="$router.push({ path: `/services/${item.id}` })"
						/>
					</template>
				</view-list>
			</div>

			<transition name="floating-button">
				<floating-button
					v-show="!isSelecting"
					class="absolute bottom-3 right-3"
					@click="create"
				/>
			</transition>

			<teleport to="#modal">
				<div
					class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
					v-if="isModalOpen"
				>
					<div class="relative bg-gray-800 p-10 rounded shadow-sm" ref="modal">
						<div class="flex flex-col gap-2">
							<div class="text-lg font-medium text-white">
								{{ isNewService ? 'Nueva' : 'Editar' }} Servicio
							</div>
							<base-input
								v-model="service.name"
								placeholder="Nombre de la categoría"
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
			</teleport>
		</template>
	</base-view>
</template>
