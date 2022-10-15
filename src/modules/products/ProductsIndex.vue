<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/modules/products/store'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

import ViewList from '@/components/ViewList.vue'
import ViewActions from '@/components/ViewActions.vue'
import ViewActionsButton from '@/components/ViewActionsButton.vue'
import ViewActionsMenu from '@/components/ViewActionsMenu.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import SearchInput from '@/components/SearchInput.vue'

const productsStore = useProductsStore()

const filters = ref({
	name: '',
})

const products = computed(() => {
	let products = productsStore.products

	for (const filter in filters.value) {
		products = products.filter(
			(p) =>
				p[filter].toLowerCase().indexOf(filters.value[filter].toLowerCase()) >=
				0
		)
	}

	return products
})

const isSelecting = ref(false)

// methods
const refresh = async () => await productsStore.fetchAll()

onMounted(async () => {
	productsStore.fetchAll()
})
</script>

<template>
	<base-view>
		<template #header>Inventario</template>

		<template #actions>
			<view-actions>
				<view-actions-menu>
					<view-actions-button label="Actualizar" @click="refresh">
						<arrow-path-icon class="h-7 w-7" />
					</view-actions-button>
				</view-actions-menu>
			</view-actions>
		</template>

		<template #content>
			<div class="px-4">
				<search-input v-model="filters.name" v-if="productsStore.products" />
				<view-list
					:items="products"
					:loading="productsStore.loading"
					v-model:isSelecting="isSelecting"
				>
					<template #item-body="{ item }"> {{ item.name }} </template>
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
