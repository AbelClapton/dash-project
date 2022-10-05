<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CalendarTimeMarkers from '../../components/calendar/CalendarTimeMarkers.vue'
/* import FloatingButton from '@/components/FloatingButton.vue' */

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

const avatarsDiv = ref(null)
const timeMarkersDiv = ref(null)

// methods
const newAppointment = () => {
	router.push({ path: 'add-appointment' })
}

const onScroll = (event) => {
	avatarsDiv.value.scrollLeft = event.target.scrollLeft
	timeMarkersDiv.value.scrollTop = event.target.scrollTop
}
</script>

<template>
	<div class="h-full w-full flex flex-col">
		<!-- Avatar Group -->
		<div class="w-full flex py-6">
			<div class="min-w-[3.5rem]"></div>
			<div class="h-full w-full overflow-x-hidden" ref="avatarsDiv">
				<div class="min-w-full flex">
					<div
						class="min-w-[33.3%] flex justify-center"
						v-for="employee in employees"
						:key="employee.id"
					>
						<BaseAvatar :user="employee" />
					</div>
				</div>
			</div>
		</div>

		<div class="h-full flex gap-4">
			<!-- Time Markers -->
			<div class="h-full min-w-fit overflow-y-hidden" ref="timeMarkersDiv">
				<div class="min-h-full w-full pt-3">
					<CalendarTimeMarkers />
				</div>
			</div>

			<!-- Events -->
			<div class="h-full w-full overflow-auto" @scroll="onScroll">
				<div class="flex">
					<div
						class="min-w-[33.3%] flex flex-col border-l border-l-gray-700 first:border-l-gray-500"
						v-for="employee in employees"
						:key="employee.id"
					>
						<div
							class="h-6 border-t border-gray-500 odd:border-t-gray-700 last:border-b last:border-b-gray-500 first:border-t-0"
							v-for="index in 30"
							:key="index"
						></div>
					</div>
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
