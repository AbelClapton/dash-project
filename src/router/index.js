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
			name: 'products',
			component: () => import('../views/InventoryView.vue'),
		},
		{
			path: '/products/:id',
			name: 'product',
			component: () => import('../views/ProductView.vue'),
		},
		{
			path: '/products/add',
			name: 'new product',
			component: () => import('../views/NewProductView.vue'),
		},
		{
			path: '/products/:id/edit',
			name: 'edit product',
			component: () => import('../views/NewProductView.vue'),
		},
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
			name: 'new employee',
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
