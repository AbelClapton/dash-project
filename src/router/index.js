import { createRouter, createWebHistory } from 'vue-router'
import schedule from '@/modules/schedule/routes.js'
import products from '@/modules/products/routes.js'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'inicio',
			component: () => import('../views/HomeView.vue'),
		},
		...products,
		{
			path: '/brands',
			name: 'brands',
			component: () => import('../views/BrandsView.vue'),
		},
		{
			path: '/categories',
			name: 'categories',
			component: () => import('../views/CategoriesView.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
		},
		{
			path: '/calendar',
			name: 'calendar',
			component: () => import('../views/CalendarView.vue'),
		},
		{
			path: '/employees',
			name: 'employees',
			component: () => import('../views/EmployeesView.vue'),
		},
		{
			path: '/employees/:id',
			name: 'employee',
			component: () => import('../views/EmployeeView.vue'),
		},
		{
			path: '/employees/:id/edit',
			name: 'edit employee',
			component: () => import('../views/NewEmployeeView.vue'),
		},
		{
			path: '/add-employee',
			name: 'new employee',
			component: () => import('../views/NewEmployeeView.vue'),
		},
		{
			path: '/services',
			name: 'services',
			component: () => import('../views/ServicesView.vue'),
		},
		{
			path: '/services/:id',
			name: 'service-details',
			component: () => import('../views/ServiceView.vue'),
		},
		{
			path: '/modules',
			name: 'modules',
			component: () => import('../views/ModulesView.vue'),
		},
		{
			path: '/404',
			name: 'not_found',
			component: () => import('../views/NotFound404View.vue'),
		},
		...schedule,
	],
})

export default router
