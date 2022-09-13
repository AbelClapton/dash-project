<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useModulesStore } from '@/data/modules.js'
import { useServicesStore } from '@/data/services.js'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseListBox from '@/components/base/BaseListBox.vue'

const modulesStore = useModulesStore()
const servicesStore = useServicesStore()

const isModalOpen = ref(false)
const isNewModule = ref(false)
const module = ref({
	id: '',
	name: '',
	service: '',
	price: '',
})

const modal = ref(null)

const create = () => {
	isNewModule.value = true
	isModalOpen.value = true
}

const edit = (id, name) => {
	module.value.id = id
	module.value.name = name
	isModalOpen.value = true
}

const save = async () => {
	if (isNewModule.value) await modulesStore.save({ name: module.value.name })
	else await modulesStore.update(module.value)
	reset()
}

const reset = () => {
	module.value.id = ''
	module.value.name = ''
	isNewModule.value = false
	isModalOpen.value = false
}

onClickOutside(modal, reset)

onMounted(() => {
	if (!servicesStore.services.length) servicesStore.fetchAll()
	if (!modulesStore.modules.length) modulesStore.fetchAll()
})
</script>

<template>
	<div class="h-full pb-24">
		<div class="flex items-center justify-between mb-4">
			<div class="text-lg font-semibold h-5">Paquetes</div>
			<button @click="create">
				<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
			</button>
		</div>
		<div class="flex items-center justify-center h-full">
			<div
				class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden w-full h-full my-2 -mx-2"
				v-if="modulesStore.modules.length"
			>
				<transition-group>
					<div
						class="flex justify-between items-center p-4 bg-slate-800 rounded"
						v-for="mod in modulesStore.modules"
						:key="mod.id"
					>
						<span>{{ mod.name }}</span>
						<div class="flex justify-center items-center gap-2">
							<button @click="edit(mod.id, mod.name)">
								<PencilIcon class="h-5 w-5 text-gray-300" />
							</button>
							<button @click="modulesStore.delete(mod.id)">
								<TrashIcon class="h-5 w-5 text-red-500" />
							</button>
						</div>
					</div>
				</transition-group>
			</div>
			<div v-else class="text-gray-500">No existen paquetes registrados.</div>
		</div>

		<Teleport to="#modal">
			<div
				class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
				v-if="isModalOpen"
			>
				<div class="relative bg-gray-800 p-10 rounded shadow-sm" ref="modal">
					<div class="flex flex-col gap-3">
						<div class="text-lg pb-3 font-medium text-white">
							{{ isNewModule ? 'Nuevo' : 'Editar' }} Paquete
						</div>
						<BaseInput v-model="module.name" placeholder="Nombre del paquete" />
						<BaseListBox
							:options="servicesStore.services"
							v-model="module.service"
							placeholder="Seleccionar servicio"
						/>
						<BaseInput
							v-model="module.price"
							type="number"
							placeholder="Precio"
						/>
						<button
							class="bg-cyan-500 text-lg font-medium text-white mt-3 py-3 px-6 rounded-lg"
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
