<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useCategoriesStore } from '@/stores/categories.js'
import { PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

import ViewList from '@/components/ViewList.vue'
import ViewActions from '@/components/ViewActions.vue'
import ViewActionsButton from '@/components/ViewActionsButton.vue'
import ViewActionsMenu from '@/components/ViewActionsMenu.vue'
import FloatingButton from '@/components/FloatingButton.vue'

const categoriesStore = useCategoriesStore()

const isModalOpen = ref(false)
const isNewCategories = ref(false)
const isSelecting = ref(false)
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
	<base-view>
		<template #header>Categorias</template>

		<template #actions>
			<view-actions>
				<view-actions-menu>
					<view-actions-button label="Actualizar" @click="fetchCategories">
						<arrow-path-icon class="w-7 h-7" />
					</view-actions-button>
				</view-actions-menu>
			</view-actions>
		</template>

		<template #content>
			<div class="px-4">
				<view-list
					:items="categoriesStore.categories"
					:loading="categoriesStore.loading"
					v-model:isSelecting="isSelecting"
				>
					<template #item-body="{ item }">
						<div
							class="w-full flex items-center justify-between py-3 pr-4 pl-5"
						>
							<span class="text-lg">{{ item.name }}</span>
							<div class="flex items-center gap-2">
								<button class="p-2" @click="edit(item.id, item.name)">
									<PencilIcon class="h-5 w-5 text-gray-300" />
								</button>
								<button class="p-2" @click="remove(item.id)">
									<TrashIcon class="h-5 w-5 text-red-500" />
								</button>
							</div>
						</div>
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
								{{ isNewCategories ? 'Nueva' : 'Editar' }} Categoría
							</div>
							<base-input
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
			</teleport>
		</template>
	</base-view>
</template>
