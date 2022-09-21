<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'
import { useBrandsStore } from '@/stores/brands.js'
import { useCategoriesStore } from '@/stores/categories.js'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseListBox from '@/components/base/BaseListBox.vue'

const productsStore = useProductsStore()
const brandsStore = useBrandsStore()
const categoriesStore = useCategoriesStore()

const product = ref({
	name: '',
	category: -1,
	price: 0,
	brand: -1,
	warningTreshold: 0,
})

const route = useRoute()
const router = useRouter()

const save = async () => {
	if (route.params.id) await productsStore.update(product.value)
	else await productsStore.save(product.value)
	router.back()
}

onMounted(() => {
	if (route.params.id) {
		product.value = productsStore.get(route.params.id)
	}
})
</script>

<template>
	<div>
		<h1 class="font-medium text-lg">
			{{ route.params.id ? 'Editar' : 'Nuevo' }} Producto
		</h1>
		<br />
		<form
			class="p-2 flex flex-col justify-between gap-4"
			@submit.prevent="save"
		>
			<div class="flex flex-col gap-4">
				<BaseInput
					label="Nombre"
					type="text"
					placeholder="Nombre del producto"
					v-model="product.name"
				/>
				<BaseListBox
					label="Categoria"
					:options="categoriesStore.categories"
					v-model="product.category"
					placeholder="Seleccionar categoría"
				/>
				<BaseListBox
					label="Marca"
					:options="brandsStore.brands"
					v-model="product.brand"
				/>
				<div class="flex gap-8">
					<BaseInput
						label="Precio"
						type="number"
						min="0"
						step=".01"
						v-model="product.price"
					/>
					<BaseInput
						label="Límite para aviso"
						type="number"
						min="0"
						step="1"
						v-model="product.warningTreshold"
					/>
				</div>
			</div>
			<div class="text-end pt-6">
				<input
					class="bg-cyan-500 text-lg font-medium text-white py-3 px-6 rounded-lg"
					type="submit"
					value="Guardar"
				/>
			</div>
		</form>
	</div>
</template>
