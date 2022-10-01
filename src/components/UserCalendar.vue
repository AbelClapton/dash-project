<script setup>
import { computed } from 'vue'
import CalendarEvent from '@/components/CalendarEvent.vue'
const props = defineProps({
	user: Object,
})

// TODO: refactor into a composable for an Avatar component
const initials = computed(() => {
	const words = props.user.name.split(' ')

	const initials = []
	for (let i = 0; i < 2 && i < words.length; i++)
		initials.push(words[i].slice(0, 1))

	return initials.join('')
})
</script>

<template>
	<div
		class="w-full flex flex-col items-center justify-center min-w-[33.3%] relative"
	>
		<!-- TODO: Refactor into a SFC -->
		<!-- Avatar -->
		<div class="flex items-center justify-center h-12 w-12">
			<div
				class="h-12 w-12 flex items-center justify-center rounded-full bg-gray-500 text-white outline-cyan-500"
			>
				{{ initials }}
			</div>
		</div>

		<!-- Grid -->
		<div class="w-full border-x border-x-gray-500 pt-4 flex flex-col">
			<div
				class="h-[1.625rem] border-t-[0.031rem] even:border-t-gray-700 odd:border-t-gray-500"
				v-for="index in 25"
				:key="index"
			></div>
		</div>

		<!-- User Events -->
		<CalendarEvent
			v-for="event in user.events"
			:key="event.id"
			:event="event"
		/>
	</div>
</template>
