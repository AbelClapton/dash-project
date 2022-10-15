<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import ViewActions from '@/components/ViewActions.vue'
import ScheduleDay from '@/modules/schedule/ScheduleDay.vue'

const actions = [
	{
		icon: EllipsisVerticalIcon,
	},
]
</script>

<template>
	<BaseView>
		<template #header> Citas </template>
		<template #actions>
			<ViewActions :actions="actions" />
		</template>
		<template #content>
			<ScheduleDay />
		</template>
	</BaseView>
</template>
