<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useBrandsStore } from '@/stores/brands.js'
import {
	PencilIcon,
	TrashIcon,
	PlusIcon,
	ArrowPathIcon,
} from '@heroicons/vue/24/outline'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'

const brandsStore = useBrandsStore()

const isModalOpen = ref(false)
const isNewBrand = ref(false)
const brand = ref({
	id: '',
	name: '',
})

const modal = ref(null)

const create = () => {
	isNewBrand.value = true
	isModalOpen.value = true
}

const edit = (id, name) => {
	brand.value.id = id
	brand.value.name = name
	isModalOpen.value = true
}

const save = async () => {
	if (isNewBrand.value) await brandsStore.save({ name: brand.value.name })
	else await brandsStore.update(brand.value)
	reset()
}

const remove = async (id) => {
	await brandsStore.remove(id)
}

const refresh = async () => {
	await brandsStore.fetchAll()
}

const reset = () => {
	brand.value.id = ''
	brand.value.name = ''
	isNewBrand.value = false
	isModalOpen.value = false
}

onClickOutside(modal, reset)

onMounted(async () => {
	if (!brandsStore.brands.length) await brandsStore.fetchAll()
})
</script>

<template>
	<div class="h-full pb-24">
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">Marcas</div>
			<div>
				<button @click="create()">
					<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</button>
				<button @click="refresh()">
					<ArrowPathIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</button>
			</div>
		</div>
		<div class="h-full w-full flex items-center justify-center pt-4">
			<transition name="list-loader" :duration="600">
				<div
					class="loader absolute top-1/4 left-1/2"
					v-if="brandsStore.loading"
				>
					<BaseSpinner class="h-10 w-10 text-cyan-500" />
				</div>
				<div
					class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden h-full w-full my-2 -mx-2"
					v-auto-animate
					v-else-if="brandsStore.brands.length"
				>
					<div
						class="flex justify-between items-center p-4 bg-slate-800 rounded"
						v-for="brand in brandsStore.brands"
						:key="brand.id"
					>
						<span>{{ brand.name }}</span>
						<div class="flex justify-center items-center gap-2">
							<button @click="edit(brand.id, brand.name)">
								<PencilIcon class="h-5 w-5 text-gray-300" />
							</button>
							<button @click="remove(brand.id)">
								<TrashIcon class="h-5 w-5 text-red-500" />
							</button>
						</div>
					</div>
				</div>
				<div v-else class="text-gray-500">No existen marcas registrados.</div>
			</transition>
		</div>

		<Teleport to="#modal">
			<div
				class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
				v-if="isModalOpen"
			>
				<div class="relative bg-gray-800 p-10 rounded shadow-sm" ref="modal">
					<div class="flex flex-col gap-2">
						<div class="text-lg font-medium text-white">
							{{ isNewBrand ? 'Nueva' : 'Editar' }} Marca
						</div>
						<BaseInput v-model="brand.name" placeholder="Nombre de la marca" />
						<button
							class="bg-cyan-500 text-lg font-light text-white py-3 px-6 rounded-lg"
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
