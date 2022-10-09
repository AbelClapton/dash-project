<script setup>
import { ref } from 'vue'
import CalendarTimeMarkers from '@/components/calendar/CalendarTimeMarkers.vue'
import CalendarClock from '@/components/calendar/CalendarClock.vue'
import ScheduleDayEvent from '@/modules/schedule/ScheduleDayEvent.vue'
import ScheduleNewEventPreview from '@/modules/schedule/ScheduleNewEventPreview.vue'
import ScheduleNewEventPanel from '@/modules/schedule/ScheduleNewEventPanel.vue'
import FloatingButton from '@/components/FloatingButton.vue'

// data
const employees = ref([
	{
		id: 1,
		name: 'Abel Rodriguez',
		picture:
			'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png',
	},
	{ id: 2, name: 'Dassiel Morales' },
	{ id: 3, name: 'Denzel Companioni' },
	{ id: 4, name: 'Marcos Yegua' },
])

const showNewEventPanel = ref(false)
const avatarsDiv = ref(null)
const timeMarkersDiv = ref(null)
const event = ref({
	title: 'New Event',
	start: '10:00',
	end: '11:00',
	employee: 1,
})

// methods
const onScroll = (event) => {
	avatarsDiv.value.scrollLeft = event.target.scrollLeft
	timeMarkersDiv.value.scrollTop = event.target.scrollTop
}

const getHour = (hour) => {
	return hour < 10 ? `0${hour}:00` : `${hour}:00`
}

// TODO: call a select function to prevent resizing on cell change
const newEvent = (e) => {
	event.value.start = e.target.dataset.start
	event.value.end = e.target.dataset.end
	event.value.employee = e.target.dataset.employee
	showNewEventPanel.value = true
}
</script>

<template>
	<div class="h-full w-full flex flex-col">
		<!-- Avatar Group -->
		<div class="w-full flex shadow-lg pt-4 pb-1.5">
			<div class="flex items-center justify-center min-w-[3.5rem] mx-1">
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
			<div class="w-full flex items-center overflow-x-hidden" ref="avatarsDiv">
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
		<div class="flex gap-4 overflow-hidden pl-3">
			<!-- Time Markers -->
			<div class="min-w-fit overflow-y-hidden" ref="timeMarkersDiv">
				<div class="w-full py-[2.375rem]">
					<CalendarTimeMarkers />
				</div>
			</div>

			<!-- Event Cells -->
			<div class="w-full overflow-auto" ref="grid" @scroll="onScroll">
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
							:data-start="getHour(index - 1)"
							:data-end="getHour(index)"
							:data-employee="employee.id"
							@click="newEvent"
						></div>
						<!-- Event Items -->
						<ScheduleDayEvent
							class="absolute left-0 w-full"
							v-for="event in employee.events"
							:key="event.id"
							:event="event"
							@click="$router.push({ path: `/schedule/events/${event.id}` })"
						/>
						<ScheduleNewEventPreview
							class="absolute left-0 text-sm"
							v-model="event"
							v-if="showNewEventPanel && employee.id == event.employee"
						/>
					</div>
				</div>
			</div>
		</div>
		<FloatingButton
			class="absolute right-3 bottom-3"
			v-show="!showNewEventPanel"
			@click="showNewEventPanel = true"
		/>
		<ScheduleNewEventPanel
			v-show="showNewEventPanel"
			:event="event"
			@dispose="showNewEventPanel = false"
		/>
	</div>
</template>

<style scoped>
span {
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
