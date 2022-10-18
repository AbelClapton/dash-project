<script setup>
import { ref, computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useBrandsStore } from '@/modules/brands/store'
import { ArrowPathIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

import ViewList from '@/components/ViewList.vue'
import ViewActionsMenu from '@/components/ViewActionsMenu.vue'
import ViewActionsButton from '@/components/ViewActionsButton.vue'
import SearchInput from '@/components/SearchInput.vue'
import FloatingButton from '@/components/FloatingButton.vue'

const brandsStore = useBrandsStore()

const filters = ref({
	name: '',
})

const brands = computed(() => {
	return brandsStore.brands.filter(
		(b) => b.name.toLowerCase().indexOf(filters.value.name.toLowerCase()) >= 0
	)
})

const isModalOpen = ref(false)
const isNewBrand = ref(false)
const isSelecting = ref(false)

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

const fetchBrands = async () => {
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
	await fetchBrands()
})
</script>

<template>
	<base-view>
		<template #header>Marcas</template>

		<template #actions>
			<view-actions-menu>
				<view-actions-button label="Actualizar" @click="fetchBrands">
					<arrow-path-icon class="h-7 w-7" />
				</view-actions-button>
			</view-actions-menu>
		</template>

		<template #content>
			<div class="px-4">
				<search-input v-model="filters.name" v-if="brands" />
				<view-list
					:items="brands"
					:loading="brandsStore.loading"
					v-model:isSelecting="isSelecting"
				>
					<template #item-body="{ item }">
						<div class="w-full flex items-center py-3 pr-4 pl-6">
							<span class="flex-grow text-lg">{{ item.name }}</span>
							<button class="p-2" @click="edit(item.id, item.name)">
								<pencil-icon class="h-5 w-5" />
							</button>
							<button class="p-2" @click="remove(item.id)">
								<trash-icon class="h-6 w-6 text-red-500" />
							</button>
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
							<BaseInput
								v-model="brand.name"
								placeholder="Nombre de la marca"
							/>
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
		</template>
	</base-view>
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
