import { createRouter, createWebHistory } from 'vue-router'
import schedule from '@/modules/schedule/routes'
import products from '@/modules/products/routes'
import brands from '@/modules/brands/routes'
import categories from '@/modules/categories/routes'
import employees from '@/modules/employees/routes'
import services from '@/modules/services/routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'inicio',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
		},
		...products,
		...brands,
		...categories,
		...employees,
		...services,
		...schedule,
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
	],
})

export default router
