<script setup>
import { onMounted } from 'vue'
// import { useProductsStore } from '@/data/products.js'
import ProductsTable from '@/components/ProductsTable.vue'
import useQuery from '@/hooks/sb-hooks-select'

const { error, data, loading, doQuery } = useQuery('products', undefined, true)
const getData = async () => {
	await doQuery()
}

onMounted(async () => {
	await doQuery()
})
</script>

<template>
	<h1 class="text-3xl font-medium">Productos</h1>
	<div v-if="loading">Loading...</div>
	<ProductsTable v-else-if="data" :data="data" @refresh="getData" />
	<div v-else-if="error">
		No se pudo encontrar la información. Revise su conexión de Internet.
	</div>
	<div v-else>No se encontraron productos</div>
	<br />
</template>
