import { createRouter, createWebHistory } from 'vue-router'
import schedule from '@/modules/schedule/routes'
import products from '@/modules/products/routes'
import brands from '@/modules/brands/routes'
import employees from '@/modules/employees/routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'inicio',
			component: () => import('../views/HomeView.vue'),
		},
		...products,
		...brands,
		...employees,
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
