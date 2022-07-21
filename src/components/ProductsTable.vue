<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import IconSortDown from '@/components/icons/IconSortDown.vue'
import IconSortUp from '@/components/icons/IconSortUp.vue'
import IconFilter from '@/components/icons/IconFilter.vue'

const router = useRouter()

const props = defineProps({
	data: {
		type: Array,
		default() {
			return []
		},
	},
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['refresh'])

const search = ref('')
const sortAsc = ref(true)
const filters = ref({
	categoria: '',
})
const isModalOpen = ref(false)

const filteredData = computed(() => {
	let filtered = props.data.filter(
		(product) =>
			product.nombre.toLowerCase().indexOf(search.value.toLowerCase()) >= 0
	)

	filtered.sort((a, b) => {
		if (a.nombre.toLowerCase() < b.nombre.toLowerCase())
			return sortAsc.value ? 1 : -1
		return sortAsc.value ? -1 : 1
	})

	return filtered
})

// const isSelecting = ref(true)
// const toggleSelectionMode = () => {
// 	isSelecting.value = !isSelecting.value
// }
</script>

<template>
	<div class="md:py-10 py-5 md:px-20">
		<div class="flex items-center py-3 gap-2">
			<div class="flex items-center">
				<input
					class="w-full py-1.5 px-3 border rounded"
					name="search"
					type="text"
					autocomplete="off"
					placeholder="Buscar"
					v-model="search"
				/>
				<IconSearch class="w-5 h-5 text-gray-700 -ml-8" />
			</div>
			<div class="md:flex-1 md:inline-block hidden"></div>
			<div
				class="p-1.5 rounded hover:bg-gray-300 hover:cursor-pointer hover:text-black text-gray-700 border"
				@click="$emit('refresh')"
			>
				<IconRefresh class="w-6 h-6 rotate-45" />
			</div>
			<div
				class="p-1.5 rounded hover:bg-gray-300 hover:cursor-pointer hover:text-black text-gray-700 border"
				@click="router.push('/products/add')"
			>
				<IconPlus class="w-6 h-6" />
			</div>
			<div
				class="p-1.5 rounded hover:bg-gray-300 hover:cursor-pointer hover:text-black text-gray-700 border"
				@click="isModalOpen = true"
			>
				<IconFilter class="w-6 h-6" />
			</div>
			<div
				class="p-1.5 rounded hover:bg-gray-300 hover:cursor-pointer hover:text-black text-gray-700 border"
				@click="sortAsc = !sortAsc"
			>
				<IconSortUp v-if="sortAsc" class="w-6 h-6" />
				<IconSortDown v-else class="w-6 h-6" />
			</div>
		</div>
		<table
			class="md:table-fixed table-auto w-full text-center text-gray-700 shadow-lg"
		>
			<thead class="font-medium">
				<tr class="bg-gray-200 border-b border-black">
					<td>Nombre</td>
					<td>Categoria</td>
					<td>Cantidad</td>
					<td>U/M</td>
				</tr>
			</thead>
			<tbody>
				<tr
					class="even:bg-gray-100 hover:cursor-pointer hover:bg-gray-300 hover:text-black"
					v-for="product in filteredData"
					:key="product.id"
				>
					<td>{{ product.nombre }}</td>
					<td>{{ product.categoria }}</td>
					<td>{{ product.cantidad }}</td>
					<td>{{ product.um }}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<Teleport to="#modal">
		<div
			class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
			v-if="isModalOpen"
		>
			<div
				class="relative bg-white h-33% w-90% shadow-2xl rounded"
				@click="isModalOpen = false"
			>
				<h3 class="text-xl">Filtrar:</h3>
				<div>
					<label for="f-categoria">Categoria:</label>
					<select name="f-categoria" v-model="filters.categoria">
						<option value="">Todos</option>
						<option value="higiene">Higiene</option>
						<option value="comida">Comida</option>
						<option value="otros">Otros</option>
					</select>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style>
.checkbox:checked + .check-icon {
	display: flex;
}

td {
	@apply md:py-1 py-4;
}

thead td {
	@apply md:py-2 py-4;
}
</style>
