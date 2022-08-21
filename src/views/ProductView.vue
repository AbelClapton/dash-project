<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useProductsStore } from '@/data/products.js'
import { DotsVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'

const productsStore = useProductsStore()
const route = useRoute()
const router = useRouter()
const product = productsStore.get(route.params.id)

const isOptionsVisible = ref(false)
const optionsMenu = ref(null)
onClickOutside(optionsMenu, () => (isOptionsVisible.value = false))

const edit = () => {
	router.push({ path: `/products/${product.id}/edit` })
}

const remove = () => {
	productsStore.delete(product.id)
	router.back()
}
</script>

<template>
	<div class="flex items-center justify-between">
		<div class="text-lg font-semibold h-5 ">
			{{ product.name }}
		</div>
		<div class="flex items-center gap-2">
			<div class="relative">
				<DotsVerticalIcon
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
						<div class="">Editar</div>
					</button>
					<button
						class="w-full flex items-center gap-3 px-5 py-2.5"
						@click="remove"
					>
						<TrashIcon class="h-5 w-5 text-red-500" />
						<div class="">Eliminar</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
