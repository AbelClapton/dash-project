<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useCategoriesStore } from '@/stores/categories.js'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'

const categoriesStore = useCategoriesStore()

const isModalOpen = ref(false)
const isNewCategories = ref(false)
const category = ref({
	id: '',
	name: '',
})

const modal = ref(null)

const create = () => {
	isNewCategories.value = true
	isModalOpen.value = true
}

const edit = (id, name) => {
	category.value.id = id
	category.value.name = name
	isModalOpen.value = true
}

const refresh = () => {
	categoriesStore.fetchAll()
}

const remove = async (id) => {
	await categoriesStore.remove(id)
}

const save = async () => {
	if (isNewCategories.value)
		await categoriesStore.save({ name: category.value.name })
	else await categoriesStore.update(category.value)
	reset()
}

const reset = () => {
	category.value.id = ''
	category.value.name = ''
	isNewCategories.value = false
	isModalOpen.value = false
}

onClickOutside(modal, reset)

onMounted(async () => {
	if (!categoriesStore.categories.length) refresh()
})
</script>

<template>
	<div class="h-full pb-24">
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">Categorías</div>
			<button @click="create">
				<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
			</button>
		</div>
		<div class="h-full w-full flex items-center justify-center pt-4">
			<div
				class="loader absolute top-1/4 left-1/2"
				v-if="categoriesStore.loading"
			>
				<BaseSpinner class="h-10 w-10 text-cyan-500" />
			</div>
			<div
				class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden h-full my-2-2 -mx-2"
				v-auto-animate
				v-else-if="categoriesStore.categories.length"
			>
				<div
					class="flex justify-between items-center p-4 bg-slate-800 rounded"
					v-for="category in categoriesStore.categories"
					:key="category.id"
				>
					<span>{{ category.name }}</span>
					<div class="flex justify-center items-center gap-2">
						<button @click="edit(category.id, category.name)">
							<PencilIcon class="h-5 w-5 text-gray-300" />
						</button>
						<button @click="remove(category.id)">
							<TrashIcon class="h-5 w-5 text-red-500" />
						</button>
					</div>
				</div>
			</div>
			<div v-else class="text-gray-500">No existen categorías registradas.</div>
		</div>

		<Teleport to="#modal">
			<div
				class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
				v-if="isModalOpen"
			>
				<div class="relative bg-gray-800 p-10 rounded shadow-sm" ref="modal">
					<div class="flex flex-col gap-2">
						<div class="text-lg font-medium text-white">
							{{ isNewCategories ? 'Nueva' : 'Editar' }} Categoría
						</div>
						<BaseInput
							v-model="category.name"
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
		</Teleport>
	</div>
</template>
