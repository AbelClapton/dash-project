export default [
	{
		path: '/services',
		name: 'services',
		component: () => import('@/modules/services/ServicesIndex.vue'),
	},
	{
		path: '/services/:id',
		name: 'service-details',
		component: () => import('@/modules/services/ServiceDetails.vue'),
	},
]
