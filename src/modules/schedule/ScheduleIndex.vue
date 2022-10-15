<script setup>
import { ref, onMounted } from 'vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'

import ViewActions from '@/components/ViewActions.vue'
import CalendarDay from '@/components/calendar/CalendarDay.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import ScheduleNewEvent from '@/modules/schedule/ScheduleNewEvent.vue'

// Stores
import { useEmployeesStore } from '@/modules/employees/store'
import { useScheduleStore } from '@/modules/schedule/store'

const employeesStore = useEmployeesStore()
const scheduleStore = useScheduleStore()

// Data
const showNewEvent = ref(false)
// TODO: Make date update to today
const event = ref({
	title: '',
	client: {
		name: '',
		phone: '',
	},
	start: {
		date: '2022-10-24',
		time: '10:00',
	},
	end: {
		date: '2022-10-24',
		time: '11:00',
	},
	isAllDay: false,
	service: {
		categoryId: '',
		serviceId: '',
	},
	employeeId: 1,
})

const actions = [
	{
		icon: EllipsisVerticalIcon,
	},
]

onMounted(() => {
	employeesStore.fetchAll()
})
</script>

<template>
	<base-view>
		<template #header> Citas </template>
		<template #actions>
			<ViewActions :actions="actions" />
		</template>
		<template #content>
			<CalendarDay
				:employees="employeesStore.employees"
				v-model="event"
				:isCreateMode="showNewEvent"
				@cellSelected="showNewEvent = true"
			/>
			<FloatingButton
				class="absolute right-3 bottom-3"
				v-show="!showNewEvent"
				@click="showNewEvent = true"
			/>
			<ScheduleNewEvent
				v-show="showNewEvent"
				v-model="event"
				@dispose="showNewEvent = false"
			/>
		</template>
	</base-view>
</template>
