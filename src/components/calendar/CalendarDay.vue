<script setup>
import { ref, computed } from 'vue'
import CalendarTimeMarkers from '@/components/calendar/CalendarTimeMarkers.vue'
import CalendarDayEvent from '@/components/calendar/CalendarDayEvent.vue'
import ScheduleNewEventPreview from '@/modules/schedule/ScheduleNewEventPreview.vue'

const props = defineProps({
	employees: {
		type: Array,
		default: () => [],
	},
	modelValue: {
		type: Object,
		default: () => {},
	},
	isCreateMode: Boolean,
})

const emit = defineEmits(['cellSelected'])

const event = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})

const avatarsDiv = ref(null)
const timeMarkersDiv = ref(null)

// methods
const onScroll = (event) => {
	avatarsDiv.value.scrollLeft = event.target.scrollLeft
	timeMarkersDiv.value.scrollTop = event.target.scrollTop
}

const getHour = (hour) => {
	return `${hour < 10 ? '0' + hour : hour}:00`
}

const onCellSelected = (cellIndex, employeeId) => {
	event.value.start.time = getHour(cellIndex - 1)
	event.value.end.time = getHour(cellIndex)
	event.value.employeeId = employeeId
	emit('cellSelected')
}
</script>

<template>
	<div class="h-full w-full">
		<div class="h-full w-full flex flex-col relative">
			<!-- Avatar Group -->
			<div class="w-full flex items-center py-4 pl-16 shadow-lg">
				<div
					class="w-full flex items-center overflow-x-hidden"
					ref="avatarsDiv"
				>
					<div
						class="min-w-[33.3%] flex flex-grow justify-center"
						v-for="employee in employees"
						:key="employee.id"
					>
						<BaseAvatar :user="employee" />
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
							class="min-w-[33.3%] flex flex-grow flex-col border-l border-l-gray-700 relative"
							v-for="employee in employees"
							:key="employee.id"
						>
							<div
								class="h-12 border-t border-dashed border-gray-700 first:border-0"
								v-for="index in 24"
								:key="index"
								@click="onCellSelected(index, employee.id)"
							></div>
							<!-- Event Items -->
							<CalendarDayEvent
								class="absolute left-0 w-full"
								v-for="event in employee.events"
								:key="event.id"
								:event="event"
								@click="$router.push({ path: `/schedule/events/${event.id}` })"
							/>
							<ScheduleNewEventPreview
								class="absolute left-0 text-sm"
								v-model="event"
								v-if="isCreateMode && employee.id == event.employeeId"
							/>
						</div>
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
