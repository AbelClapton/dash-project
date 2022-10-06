<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CalendarTimeMarkers from '@/components/calendar/CalendarTimeMarkers.vue'
import CalendarClock from '@/components/calendar/CalendarClock.vue'
import ScheduleDayEvent from '@/modules/schedule/ScheduleDayEvent.vue'
import FloatingButton from '@/components/FloatingButton.vue'

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
			{ id: 2, start: '11:00', end: '11:30', title: 'Test' },
		],
	},
	{ id: 2, name: 'Dassiel Morales' },
	{
		id: 3,
		name: 'Denzel Companioni',
		events: [
			{ id: 3, start: '08:00', end: '10:00', title: 'Test' },
			{ id: 4, start: '11:00', end: '11:30', title: 'Test' },
		],
	},
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
	<div class="h-full w-full flex flex-col relative">
		<!-- Avatar Group -->
		<div class="w-full flex shadow-lg pb-1.5">
			<div class="flex items-center justify-center min-w-[3.5rem] -ml-3 mr-3">
				<div class="flex flex-col items-center justify-center gap-0.5">
					<span class="text-sm text-cyan-600 font-light">hoy</span>
					<div
						class="bg-cyan-600 text-slate-700 font-bold text-lg rounded-full h-8 w-8 flex items-center justify-center"
					>
						19
					</div>
					<span class="text-xs text-cyan-600 font-light">
						<!-- TODO: make timeline -->
						<CalendarClock />
					</span>
				</div>
			</div>
			<div
				class="h-full w-full flex items-center overflow-x-hidden"
				ref="avatarsDiv"
			>
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

		<!-- Grid -->
		<div class="h-full flex gap-4 overflow-hidden">
			<!-- Time Markers -->
			<div class="h-full min-w-fit overflow-y-hidden" ref="timeMarkersDiv">
				<div class="w-full py-[2.375rem]">
					<CalendarTimeMarkers />
				</div>
			</div>

			<!-- Event Cells -->
			<div class="h-full w-full overflow-auto" @scroll="onScroll">
				<div class="flex">
					<div
						class="min-w-[33.3%] flex flex-col border-l border-l-gray-700 relative"
						v-for="employee in employees"
						:key="employee.id"
					>
						<div
							class="h-12 border-t border-dashed border-gray-700 first:border-0"
							v-for="index in 24"
							:key="index"
						></div>
						<!-- Event Items -->
						<ScheduleDayEvent
							class="absolute left-0 w-full"
							v-for="event in employee.events"
							:key="event.id"
							:event="event"
						/>
					</div>
				</div>
			</div>
		</div>
		<FloatingButton class="absolute right-0 bottom-3" />
	</div>
</template>

<style scoped>
span {
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
