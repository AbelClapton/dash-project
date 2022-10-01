<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCategoriesStore } from '@/stores/categories'
import { useBrandsStore } from '@/stores/brands'
import BaseView from '@/components/base/BaseView.vue'
import ViewList from '@/components/ViewList.vue'
import {
	PlusIcon,
	MagnifyingGlassIcon,
	EllipsisVerticalIcon,
	ArrowPathIcon,
} from '@heroicons/vue/24/outline'
import SearchPanel from '../components/panels/SearchPanel.vue'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const brandsStore = useBrandsStore()
const router = useRouter()

const isSearchVisible = ref(false)
const showSearch = () => {
	isSearchVisible.value = true
}
const hideSearch = () => {
	isSearchVisible.value = false
	filters.value.name = ''
}

const filters = ref({
	name: '',
})

const products = computed(() => {
	let filtered = productsStore.products.filter(
		(p) => p.name.toLowerCase().indexOf(filters.value.name.toLowerCase()) >= 0
	)
	return filtered
})

const loading = computed(
	() => productsStore.loading || categoriesStore.loading || brandsStore.loading
)

const refresh = async () => {
	await categoriesStore.fetchAll()
	await brandsStore.fetchAll()
	await productsStore.fetchAll()
}

const addProduct = () => {
  router.push({ path: 'add-product' })
}

const actions = [
	{ icon: PlusIcon, action: addProduct },
	{ icon: MagnifyingGlassIcon, action: showSearch },
	{
		icon: EllipsisVerticalIcon,
		actions: [{ icon: ArrowPathIcon, action: refresh }],
	},
]

const itemAction = (id) => {
	router.push({ path: `products/${id}` })
}

onMounted(async () => {
	if (!categoriesStore.categories.length) await categoriesStore.fetchAll()
	if (!brandsStore.brands.length) await brandsStore.fetchAll()
	if (!productsStore.products.length) await productsStore.fetchAll()
})
</script>

<template>
	<BaseView title="Productos" :actions="actions">
		<ViewList :items="products" :loading="loading" :action="itemAction">
			<template #item-body="{ item }">
				<span class="font-regular">
					{{ brandsStore.get(item.brand).name }} - {{ item.name }}
				</span>
				<div class="flex gap-3">
					<div class="flex items-center text-gray-300 font-light gap-1">
						<TagIcon class="h-4 w-4" />
						<span>{{ categoriesStore.get(item.category).name }}</span>
					</div>
					<div class="flex items-center text-gray-300 font-light">
						<DolarIcon class="h-4 w-4" />
						<span>{{ item.price }}</span>
					</div>
					<div class="flex items-center text-gray-300 font-light gap-1 pl-1">
						<BoxIcon class="h-4 w-4" />
						<span class="">{{ item.stock }}</span>
					</div>
					<div></div>
				</div>
			</template>
		</ViewList>
		<SearchPanel
			v-if="isSearchVisible"
			:modelValue="filters.name"
			@close="hideSearch"
		/>
	</BaseView>
</template>
