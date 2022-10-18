<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProductsStore } from '@/modules/products/store'
import { useBrandsStore } from '@/modules/brands/store'

const route = useRoute()
const router = useRouter()
const brands = useBrandsStore().brands
const productsStore = useProductsStore()
const isUpdate = ref(!!route.params.id)

const product = ref({
	name: '',
	brandId: '',
	price: 0,
	warningThreshold: 0,
})

const validate = () => {
	// TODO: Product name + brand already exists?
	return true
}

const save = async () => {
	if (!validate()) return

	if (isUpdate.value) productsStore.update(product.value)
	else productsStore.save(product.value)

	router.back()
}

onMounted(() => {
	if (route.params.id) product.value = productsStore.get(route.params.id)
})
</script>

<template>
	<div class="p-6">
		<h1 class="font-medium text-lg">
			{{ route.params.id ? 'Editar' : 'Nuevo' }} Producto
		</h1>
		<br />
		<form class="flex flex-col justify-between gap-4" @submit.prevent="save">
			<div class="flex flex-col gap-4">
				<base-input
					label="Nombre"
					type="text"
					placeholder="Nombre del producto"
					v-model="product.name"
				/>
				<base-list-box
					label="Marca"
					:options="brands"
					v-model="product.brandId"
				/>
				<div class="flex gap-8">
					<base-input
						label="Precio"
						type="number"
						min="0"
						step=".01"
						v-model="product.price"
					/>
					<base-input
						label="Límite para aviso"
						type="number"
						min="0"
						step="1"
						v-model="product.warningThreshold"
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
