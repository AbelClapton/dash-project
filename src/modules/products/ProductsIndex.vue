<script setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowPathIcon, TagIcon } from '@heroicons/vue/24/outline'

import ViewList from '@/components/ViewList.vue'
import ViewActions from '@/components/ViewActions.vue'
import ViewActionsButton from '@/components/ViewActionsButton.vue'
import ViewActionsMenu from '@/components/ViewActionsMenu.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import SearchInput from '@/components/SearchInput.vue'
import ProductListItem from '@/modules/products/ProductListItem.vue'

import { useProductsStore } from '@/modules/products/store'
import { useBrandsStore } from '@/modules/brands/store'

const productsStore = useProductsStore()
const brandsStore = useBrandsStore()

// TODO: Make into a composable
const filters = ref({
	name: '',
})

const isSelecting = ref(false)
const isLoading = computed(() => productsStore.loading || brandsStore.loading)

const products = computed(() => {
	return productsStore.products
		.filter(
			(p) => p.name.toLowerCase().indexOf(filters.value.name.toLowerCase()) >= 0
		)
		.map((p) => ({ ...p, brand: brandsStore.get(p.brandId).name }))
})

// methods
const fetchProducts = async () => {
	await productsStore.fetchAll()
}

// TODO: separate loader for trash button to display list animation instead of loader
const remove = async (id, name) => {
	if (!confirm('Desea eliminar el producto ' + name + '?')) return
	productsStore.remove(id)
}

onMounted(async () => {
	await fetchProducts()
})
</script>

<template>
	<base-view>
		<template #header>Inventario</template>

		<template #actions>
			<view-actions>
				<view-actions-menu>
					<view-actions-button label="Actualizar" @click="fetchProducts">
						<arrow-path-icon class="h-7 w-7" />
					</view-actions-button>
					<hr class="border-t-gray-500 border-t-[0.025rem]" />
					<view-actions-button
						label="Marcas"
						@click="$router.push({ path: '/brands' })"
					>
						<tag-icon class="h-7 w-7" />
					</view-actions-button>
				</view-actions-menu>
			</view-actions>
		</template>

		<template #content>
			<div class="px-4">
				<search-input v-model="filters.name" v-if="products" />
				<view-list
					:items="products"
					:loading="isLoading"
					v-model:isSelecting="isSelecting"
				>
					<template #item-body="{ item }">
						<product-list-item :product="item" @remove="remove" />
					</template>
				</view-list>
			</div>

			<transition name="floating-button">
				<floating-button
					v-show="!isSelecting"
					class="absolute bottom-3 right-3"
					@click="$router.push({ path: '/add-product' })"
				/>
			</transition>
		</template>
	</base-view>
</template>

<style>
.floating-button-enter-from,
.floating-button-leave-to {
	transform: translateY(100px);
}

.floating-button-enter-active,
.floating-button-leave-active {
	transition: transform 0.3s ease-in-out;
}

.floating-button-enter-active {
	transition-delay: 0.1s;
}
</style>
