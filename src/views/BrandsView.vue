<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useBrandsStore } from '@/data/brands.js'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/vue/outline'
import BaseInput from '@/components/base/BaseInput.vue'

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

const reset = () => {
	brand.value.id = ''
	brand.value.name = ''
	isNewBrand.value = false
	isModalOpen.value = false
}

onClickOutside(modal, reset)
</script>

<template>
	<div class="h-full">
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">Marcas</div>
			<button @click="create">
				<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
			</button>
		</div>
		<div
			class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden h-full py-2 mt-2 -mx-2"
		>
			<transition-group>
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
						<button @click="brandsStore.delete(brand.id)">
							<TrashIcon class="h-5 w-5 text-red-500" />
						</button>
					</div>
				</div>
			</transition-group>
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
