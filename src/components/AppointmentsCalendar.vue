<script setup>
import { ref, onMounted } from 'vue'
import PlusButton from '@/components/PlusButton.vue'
import UserCalendar from '@/components/UserCalendar.vue'
import BaseModal from './base/BaseModal.vue'

const isModalOpen = ref(false)
const markers = ref([])
const employees = ref([
	{
		id: 1,
		name: 'Abel Rodriguez',
		events: [
			{ id: 1, start: '08:00', end: '10:00', title: 'Test' },
			{ id: 1, start: '11:00', end: '11:30', title: 'Test' },
		],
	},
	{ id: 2, name: 'Dassiel Morales' },
	{ id: 3, name: 'Denzel Companioni' },
	{ id: 4, name: 'Marcos Yegua' },
])

onMounted(() => {
	let h = 8
	for (let i = 0; i < 25; i++) {
		let H = h + Math.floor(i / 2)
		if (H < 10) H = `0${H}`
		markers.value.push(`${H}:${i % 2 === 0 ? '00' : '30'}`)
	}
})
</script>

<template>
	<div class="h-full w-full flex relative">
		<div class="w-full flex flex-col overflow-y-auto">
			<!-- Time markers -->
			<div class="w-full flex">
				<div class="flex flex-col gap-1.5 border-r mt-12 pr-3 pt-1.5">
					<span
						class="text-gray-400 even:text-gray-500 font-light text-sm"
						v-for="(marker, index) in markers"
						:key="index"
					>
						{{ marker }}
					</span>
				</div>

				<!-- Employee Day View -->
				<div class="w-full flex overflow-x-auto">
					<UserCalendar
						v-for="employee in employees"
						:key="employee.id"
						:user="employee"
					/>
				</div>
			</div>
		</div>

		<!-- Employees Calendar -->
		<!-- <UserCalendar v-for="employee in employees" :key="employee.id" /> -->

		<BaseModal :isOpen="isModalOpen" />
		<PlusButton />
	</div>
</template>

<style scoped>
span {
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
