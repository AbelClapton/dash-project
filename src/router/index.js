import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'inicio',
			component: HomeView,
		},
		{
			path: '/menu',
			name: 'menu',
			component: () => import('../views/MenuView.vue'),
		},
		{
			path: '/products',
			name: 'productos',
			component: () => import('../views/InventoryView.vue'),
		},
		{
			path: '/products/add',
			name: 'nuevo producto',
			component: () => import('../views/NewProductView.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
		},
		{
			path: '/404',
			name: 'not_found',
			component: () => import('../views/NotFound404View.vue'),
		},
	],
})

export default router
