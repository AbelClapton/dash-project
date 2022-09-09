<script setup>
import { ref, computed, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useProductsStore } from '@/data/products.js'
import {
	DotsVerticalIcon,
	SortAscendingIcon,
	SearchIcon,
	PlusIcon,
	XIcon,
} from '@heroicons/vue/outline'
import ProductsList from '@/components/ProductsList.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import FilterIcon from '@/components/icons/FilterIcon.vue'

const productsStore = useProductsStore()

const isOptionsVisible = ref(false)
const isSearchVisible = ref(false)

const filters = ref({
	name: '',
})

const products = computed(() => {
	let filtered = productsStore.products.filter(
		(p) => p.name.toLowerCase().indexOf(filters.value.name.toLowerCase()) >= 0
	)
	return filtered
})

const optionsMenu = ref(null)
const searchInput = ref(null)
const searchDiv = ref(null)

onClickOutside(optionsMenu, () => {
	isOptionsVisible.value = false
})
onClickOutside(searchDiv, () => {
	filters.value.name = ''
	isSearchVisible.value = false
})

const sort = () => {
	isOptionsVisible.value = false
}

const filter = () => {
	isOptionsVisible.value = false
}

const showSearch = () => {
	isSearchVisible.value = true
	nextTick(() => {
		searchInput.value.focus()
	})
}

const onSearchInput = (event) => {
	filters.value.name = event.target.value
}
</script>

<template>
	<div class="h-full pb-20">
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">Inventario</div>
			<div class="flex items-center gap-2">
				<router-link to="/products/add">
					<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</router-link>
				<SearchIcon
					class="h-7 w-7 p-1 rounded hover:bg-gray-600"
					@click="showSearch"
				/>
				<div class="">
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
							@click="sort"
						>
							<SortAscendingIcon class="h-5 w-5" />
							<div>Ordenar</div>
						</button>
						<button
							class="w-full flex items-center gap-3 px-5 py-2.5"
							@click="filter"
						>
							<FilterIcon class="h-5 w-5" />
							<div>Filtrar</div>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Products -->
		<div class="flex items-center justify-center h-full w-full">
			<transition name="fade">
				<BaseSpinner
					class="absolute top-1/2 left-1/2 h-12 w-12 text-cyan-500"
					v-if="productsStore.loading"
				/>
				<ProductsList
					v-else-if="productsStore.products.length"
					:products="products"
					@delete="productsStore.deleteMultiple"
				/>
				<div v-else class="text-gray-500">
					No existen productos registrados.
				</div>
			</transition>
		</div>
		<!-- End of Products -->

		<!-- Search Input -->
		<div
			class="absolute -bottom-1 left-0 z-10 w-full h-16 bg-gray-800 flex items-center px-3"
			v-show="isSearchVisible"
			ref="searchDiv"
		>
			<SearchIcon class="h-7 w-7 p-1 rounded text-gray-400" />
			<input
				class="bg-gray-800 border-0 outline-0 h-full flex-grow pl-3"
				type="text"
				ref="searchInput"
				placeholder="Buscar por nombre"
				@input="onSearchInput($event)"
			/>
			<XIcon
				class="h-7 w-7 p-1 rounded text-gray-400"
				@click="isSearchVisible = false"
			/>
		</div>
		<!-- End of Search Input -->

		<!-- Filter Menu -->
		<!-- <div class="absolute -bottom-1 left-0 z-10 w-full bg-gray-800">
			<div class="py-2 px-3">
				<div></div>Alimentos</div>
			<div class="py-2 px-3">
				<div></div>Higiene</div>
			<div class="py-2 px-3">
				<div></div>Decoracion</div>
			<div class="py-2 px-3">
				<div></div>Otros</div>
		</div> -->
		<!-- End of Filter Menu -->
	</div>
</template>
