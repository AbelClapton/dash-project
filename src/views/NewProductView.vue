<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/data/products.js'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseListBox from '@/components/base/BaseListBox.vue'

const categories = [
	{ value: 1, label: 'Higiene' },
	{ value: 2, label: 'Comida' },
	{ value: 3, label: 'Otros' },
]

const brands = [
	{ value: 1, label: 'Sedal' },
	{ value: 2, label: 'Rexona' },
	{ value: 3, label: 'Prodal' },
]

const productsStore = useProductsStore()
const product = ref({
	name: '',
	category: '',
	price: 0,
	brand: '',
	warningTreshold: 0,
	alertTreshold: 0,
})

const route = useRoute()
const router = useRouter()

const save = async () => {
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
					:options="categories"
					v-model="product.category"
					placeholder="Seleccionar categoría"
				/>
				<div class="flex gap-8">
					<BaseInput
						label="Precio"
						type="number"
						min="0"
						step=".01"
						v-model="product.price"
					/>
					<BaseListBox
						label="Marca"
						:options="brands"
						v-model="product.brand"
					/>
				</div>
				<div class="flex gap-8">
					<BaseInput
						label="Limite para aviso"
						type="number"
						min="0"
						step="1"
						v-model="product.warningTreshold"
					/>
					<BaseInput
						label="Limite para alerta"
						type="number"
						min="0"
						step="1"
						v-model="product.alertTreshold"
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
