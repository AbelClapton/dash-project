<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CalendarTimeMarkers from '@/components/calendar/CalendarTimeMarkers.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import ScheduleUserDay from '@/modules/schedule/ScheduleUserDay.vue'

// data
const router = useRouter()
const employees = ref([
	{
		id: 1,
		name: 'Abel Rodriguez',
		picture:
			'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png',
		events: [
			{ id: 1, start: '08:00', end: '10:00', title: 'Test' },
			{ id: 1, start: '11:00', end: '11:30', title: 'Test' },
		],
	},
	{ id: 2, name: 'Dassiel Morales' },
	{ id: 3, name: 'Denzel Companioni' },
	{ id: 4, name: 'Marcos Yegua' },
])

// methods
const newAppointment = () => {
	router.push({ path: 'add-appointment' })
}

onMounted(() => {})
</script>

<template>
	<div class="h-full w-full flex overflow-y-auto">
		<!-- Time Markers -->
		<div class="min-h-full pt-16 pr-4">
			<CalendarTimeMarkers />
		</div>

		<!-- Events Grid -->
		<div class="w-full flex flex-col overflow-x-auto overflow-y-hidden">
			<!-- Avatar Group -->
			<div class="min-w-full flex">
				<div
					class="min-w-[33.3%] flex justify-center"
					v-for="employee in employees"
					:key="employee.id"
				>
					<BaseAvatar :user="employee" />
				</div>
			</div>

			<!-- Events -->
			<div class="h-full flex pt-7">
				<div
					class="min-w-[33.3%] flex flex-col border-l border-l-gray-700 first:border-l-gray-500"
					v-for="employee in employees"
					:key="employee.id"
				>
					<div
						class="h-16 border-t border-gray-500 odd:border-t-gray-700 last:border-b last:border-b-gray-500 first:border-t-0"
						v-for="index in 30"
						:key="index"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
span {
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
