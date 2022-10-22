export default [
	{
		path: '/employees',
		name: 'employees-home',
		component: () => import('@/modules/employees/EmployeesIndex.vue'),
	},
	{
		path: '/employees/:id',
		name: 'employee-details',
		component: () => import('@/modules/employees/EmployeeDetails.vue'),
		props: true,
	},
	{
		path: '/employees/:id/edit',
		name: 'edit-employee',
		component: () => import('@/modules/employees/EmployeeNew.vue'),
	},
	{
		path: '/add-employee',
		name: 'add-employee',
		component: () => import('@/modules/employees/EmployeeNew.vue'),
	},
]
