<script setup>
import { ref, watch } from 'vue'
import { TrashIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import ProductsListItem from '@/components/ProductsListItem.vue'

const props = defineProps({
	products: {
		type: Array,
		default() {
			return []
		},
	},
})

const emit = defineEmits(['delete'])

const isSelecting = ref(false)
const selectedProducts = ref([])

const selectOn = (id) => {
	isSelecting.value = true
	selectedProducts.value.push(id)
}

const selectOff = () => {
	isSelecting.value = false
	selectedProducts.value = []
}

const deleteSelected = () => {
	emit('delete', selectedProducts.value)
	isSelecting.value = false
	selectedProducts.value = []
}

const select = (id) => {
	selectedProducts.value.push(id)
}

const unselect = (id) => {
	selectedProducts.value = selectedProducts.value.filter((p) => p !== id)
}

watch(selectedProducts, (newValue) => {
	if (newValue.length === 0) isSelecting.value = false
})
</script>

<template>
	<div class="h-full py-2 mt-2 -mx-2">
		<div class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden h-full">
			<transition-group name="list">
				<ProductsListItem
					v-for="product in props.products"
					:key="product.id"
					:product="product"
					:isSelecting="isSelecting"
					@selectOn="selectOn"
					@select="select"
					@unselect="unselect"
				/>
			</transition-group>
		</div>
	</div>
	<transition name="slide">
		<div
			class="absolute -bottom-1 flex -pt-1 items-center justify-between left-0 z-10 w-full h-16 bg-gray-700 px-4"
			v-if="isSelecting"
		>
			<ChevronLeftIcon class="h-5 w-5 text-gray-400" @click="selectOff" />
			<div class="text-gray-400">
				{{ selectedProducts.length || 0 }} seleccionados
			</div>
			<TrashIcon class="h-5 w-5 text-red-400" @click="deleteSelected" />
		</div>
	</transition>
</template>
