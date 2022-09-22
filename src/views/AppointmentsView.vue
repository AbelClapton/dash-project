<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseView from '@/components/base/BaseView.vue'
import ViewList from '@/components/ViewList.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const data = ref([
	{
		name: 'Hoy',
		items: [
			{ id: 0, service: 'Manicuri', date: new Date(), module: 'Todo en 1' },
			{ id: 1, service: 'Pedicuri', date: new Date(), module: 'Paquete 2' },
		],
	},
	{
		name: 'Mañana',
		items: [
			{ id: 2, service: 'Manicuri', date: new Date(), module: 'Todo en 1' },
			{ id: 3, service: 'Pedicuri', date: new Date(), module: 'Paquete 2' },
		],
	},
	{
		name: 'Pasado Mañana',
		items: [
			{ id: 4, service: 'Manicuri', date: new Date(), module: 'Todo en 1' },
			{ id: 5, service: 'Pedicuri', date: new Date(), module: 'Paquete 2' },
			{ id: 6, service: 'Manicuri', date: new Date(), module: 'Todo en 1' },
			{ id: 7, service: 'Pedicuri', date: new Date(), module: 'Paquete 2' },
			{ id: 8, service: 'Manicuri', date: new Date(), module: 'Todo en 1' },
			{ id: 9, service: 'Pedicuri', date: new Date(), module: 'Paquete 2' },
		],
	},
])

const addAppointment = () => {
	router.push({ path: '/add-appointment' })
}

const actions = ref([
	{
		icon: PlusIcon,
		action: addAppointment,
	},
])

const action = (id) => {
	router.push({ path: `/appointments/${id}` })
}
</script>

<template>
	<BaseView title="Reservaciones" :actions="actions">
		<ViewList :items="data" :action="action" groups>
			<template #item-body="{ item }">
				<div class="w-full flex items-center justify-between">
					<span>{{ item.service }}</span>
					<span>{{ item.module }}</span>
					<span>
						{{
							item.date.toLocaleTimeString('en-GB', {
								hour: '2-digit',
								minute: '2-digit',
							})
						}}
					</span>
				</div>
			</template>
		</ViewList>
	</BaseView>
</template>
