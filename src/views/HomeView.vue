<script setup>
import { ref, onMounted } from 'vue'
import BaseView from '@/components/base/BaseView.vue'
import ViewList from '@/components/ViewList.vue'
import { useBrandsStore } from '@/data/brands.js'
import { useRouter } from 'vue-router'
import {
	PlusIcon,
	EllipsisVerticalIcon,
	PencilIcon,
	TrashIcon,
	ArrowPathIcon,
} from '@heroicons/vue/24/outline'

const actions = ref([
	{
		icon: PlusIcon,
	},
	{
		icon: EllipsisVerticalIcon,
		actions: [
			{
				icon: ArrowPathIcon,
				action: refresh,
				label: 'Refrescar',
			},
			{
				icon: PencilIcon,
				label: 'Editar',
			},
			{
				icon: TrashIcon,
				label: 'Remover',
				iconStyle: 'text-red-500',
			},
		],
	},
])

const router = useRouter()
const brandsStore = useBrandsStore()

function action(id) {
	router.push({ path: `/brands/${id}` })
}

async function edit(id) {
	brandsStore.update()
}

async function refresh() {
	await brandsStore.fetchAll()
}

onMounted(async () => {
	if (!brandsStore.brands.length) refresh()
})
</script>

<template>
	<BaseView title="Home" :actions="actions">
		<ViewList
			:items="brandsStore.brands"
			:loading="brandsStore.loading"
			:action="action"
		>
			<template #item-body="{ item }">
				<span>{{ item.name }}</span>
				<div class="flex justify-center items-center gap-2">
					<button @click="edit(item.id, item.name)">
						<PencilIcon class="h-5 w-5 text-gray-300" />
					</button>
					<button @click="remove(item.id)">
						<TrashIcon class="h-5 w-5 text-red-500" />
					</button>
				</div>
			</template>
			<template #no-items-message> No existen marcas registrados. </template>
		</ViewList>
	</BaseView>
</template>
