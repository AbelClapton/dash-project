export default [
	{
		path: '/schedule',
		name: 'schedule',
		component: () => import('@/modules/schedule/ScheduleIndex.vue'),
	},
	{
		path: '/schedule/add-schedule/',
		name: 'add-schedule',
		component: () => import('@/modules/schedule/ScheduleNewEvent.vue'),
	},
	{
		path: '/schedule/events/:id',
		name: 'event-details',
		component: () => import('@/modules/schedule/ScheduleEventDetails.vue'),
	},
]
