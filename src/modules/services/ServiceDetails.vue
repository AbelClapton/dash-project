<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import {
	EllipsisVerticalIcon,
	PencilIcon,
	TrashIcon,
	PlusIcon,
	CurrencyDollarIcon,
} from '@heroicons/vue/24/outline'

import { useServicesStore } from '@/stores/services.js'
import { useModulesStore } from '@/stores/modules.js'

const route = useRoute()
const router = useRouter()
const servicesStore = useServicesStore()
const modulesStore = useModulesStore()

const service = servicesStore.get(route.params.id)

const modules = computed(() =>
	modulesStore.modules.filter((m) => m.service == service.id)
)

const isOptionsVisible = ref(false)
const optionsMenu = ref(null)
onClickOutside(optionsMenu, () => (isOptionsVisible.value = false))

const isModalOpen = ref(false)

const serviceName = ref('')

const module = ref({
	name: '',
	service: service.id,
	price: '',
})
const showModal = ref('')

const addModule = () => {
	showModal.value = 'addModule'
	isModalOpen.value = true
}

const edit = () => {
	showModal.value = 'editService'
	isModalOpen.value = true
}

const save = async () => {
	if (showModal.value == 'editService')
		await servicesStore.update({ id: service.id, name: serviceName.value })
	else {
		await modulesStore.save(module.value)
		reset()
	}
	isModalOpen.value = false
}

const remove = () => {
	servicesStore.delete(service.id)
	router.back()
}

const reset = () => {
	module.value.name = ''
	module.value.price = ''
}

onMounted(() => {
	if (!servicesStore.services.length) servicesStore.fetchAll()
	if (!modulesStore.modules.length) modulesStore.fetchAll()
	serviceName.value = service.name
})
</script>

<template>
	<div class="h-full pb-24">
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">
				{{ service.name }}
			</div>
			<div class="flex items-center gap-2">
				<button @click="addModule">
					<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</button>
				<EllipsisVerticalIcon
					class="h-7 w-7 p-1 rounded hover:bg-gray-600"
					@click="isOptionsVisible = true"
				/>
				<div
					class="absolute right-0 top-0 flex flex-col shadow-lg shadow-gray-900 bg-gray-800"
					ref="optionsMenu"
					v-show="isOptionsVisible"
				>
					<button
						class="w-full flex items-center gap-3 px-5 py-2.5"
						@click="edit"
					>
						<PencilIcon class="h-5 w-5" />
						<div>Editar</div>
					</button>
					<button
						class="w-full flex items-center gap-3 px-5 py-2.5"
						@click="remove"
					>
						<TrashIcon class="h-5 w-5 text-red-500" />
						<div>Eliminar</div>
					</button>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-center h-full pt-4">
			<transition name="list-loader" :duration="600">
				<div
					class="loader absolute top-1/4 left-1/2"
					v-if="servicesStore.loading"
				>
					<BaseSpinner class="h-10 w-10 text-cyan-500" />
				</div>
				<div
					class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden w-full h-full my-2 -mx-2"
					v-else-if="modules.length"
					v-auto-animate
				>
					<div
						class="flex justify-between items-center p-4 bg-slate-800 rounded"
						v-for="mod in modules"
						:key="mod.id"
					>
						<div class="flex gap-4">
							<span>{{ mod.name }}</span>
							<div class="flex items-center justify-center gap-1 text-gray-400">
								<CurrencyDollarIcon class="h-4 w-4" />
								<span>{{ mod.price }}</span>
							</div>
						</div>
						<div class="flex justify-center items-center gap-2">
							<button @click="edit(mod.id, mod.name)">
								<PencilIcon class="h-5 w-5 text-gray-300" />
							</button>
							<button @click="modulesStore.delete(mod.id)">
								<TrashIcon class="h-5 w-5 text-red-500" />
							</button>
						</div>
					</div>
				</div>
				<div v-else class="text-gray-500">No existen paquetes registrados.</div>
			</transition>
		</div>

		<base-modal v-model="isModalOpen">
			<div v-if="showModal == 'editService'" class="flex flex-col gap-2">
				<div class="text-lg font-medium text-white">Editar Servicio</div>
				<BaseInput
					v-model="serviceName"
					placeholder="Nombre del servicio"
					ref="editServiceName"
				/>
				<button
					class="bg-cyan-500 text-lg font-medium text-white py-3 px-6 rounded-lg"
					@click="save"
				>
					Guardar
				</button>
			</div>

			<div v-else-if="showModal == 'addModule'" class="flex flex-col gap-3">
				<div class="text-lg pb-3 font-medium text-white">Nuevo Paquete</div>
				<BaseInput v-model="module.name" placeholder="Nombre del paquete" />
				<BaseInput v-model="module.price" type="number" placeholder="Precio" />
				<button
					class="bg-cyan-500 text-lg font-medium text-white mt-6 py-3 px-6 rounded-lg"
					@click="save"
				>
					Guardar
				</button>
			</div>
		</base-modal>
	</div>
</template>

<style>
.list-loader-enter-from :not(.loader),
.list-loader-leave-to :not(.loader) {
	opacity: 0;
}

.list-loader-enter-active :not(.loader),
.list-loader-leave-active :not(.loader) {
	transition: opacity 0.3s ease;
}

.list-loader-enter-from .loader,
.list-loader-leave-to .loader {
	transform: translateY(-50%);
}

.list-loader-enter-active .loader,
.list-loader-leave-active .loader {
	transition: transform 0.3s ease;
}
</style>
