export default [
  {
      path: '/appointments',
      name: 'appointments',
      component: () => import('../views/AppointmentsView.vue'),
    },
    {
      path: '/add-appointment',
      name: 'add-appointment',
      component: () => import('../views/NewAppointmentView.vue'),
    },
    {
			path: '/appointments/:id',
			name: 'appointment-details',
			component: () => import('../views/AppointmentDetailsView.vue'),
		},
		
]
