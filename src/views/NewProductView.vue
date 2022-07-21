<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useUpsert from '@/hooks/sb-hooks-upsert'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseListBox from '@/components/base/BaseListBox.vue'

const categorias = [
	{ value: 1, label: 'Higiene' },
	{ value: 2, label: 'Comida' },
	{ value: 3, label: 'Otros' },
]

const um = [
	{ value: 1, label: 'Unidades' },
	{ value: 2, label: 'Libras' },
	{ value: 3, label: 'Litros' },
]

const formData = ref({
	name: '',
	category: '',
	price: 0,
	cost: 0,
	amount: 0,
	um: um[0].value,
})

const { loading, error, doUpsert } = useUpsert()
const router = useRouter()

const saveData = async () => {
	const resp = await doUpsert('products', [{ ...formData.value }])
	if (resp && !error.value) {
		router.replace('/products')
	}
}
</script>

<template>
	<div v-if="loading">LOADING...</div>
	<div v-else-if="error" class="error-panel">{{ error.message }}</div>
	<h1 class="font-medium text-3xl p-4">Nuevo Producto</h1>
	<form
		class="p-4 flex flex-col justify-between gap-4"
		@submit.prevent="saveData"
	>
		<div class="flex flex-col gap-4">
			<BaseInput
				label="Nombre"
				type="text"
				placeholder="Nombre del producto"
				v-model="formData.name"
			/>
			<BaseListBox
				label="Categoria"
				:options="categorias"
				v-model="formData.categoria"
				placeholder="Seleccionar categoría"
			/>
			<div class="flex gap-8">
				<BaseInput
					label="Precio"
					type="number"
					min="0"
					step=".01"
					v-model="formData.price"
				/>
				<BaseInput label="Costo" type="number" v-model="formData.cost" />
			</div>
			<div class="flex gap-8">
				<BaseInput label="Cantidad" type="number" v-model="formData.amount" />
				<BaseListBox label="U/M" :options="um" v-model="formData.um" />
			</div>
		</div>
		<div class="text-end absolute right-8 bottom-8">
			<input
				class="bg-sky-500 text-lg font-medium text-white py-3 px-6 rounded-lg"
				type="submit"
				value="Guardar"
			/>
		</div>
	</form>
</template>
