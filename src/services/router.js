import { createRouter, createWebHistory } from 'vue-router'
import { readdir } from 'fs'
const routes = []

const loadRoutes = () => {
	const context = require.context('@/modules', true, /routes.js$/i)
	return context
		.keys()
		.map(context) // import module
		.map((m) => m.default) // get `default` export from each resolved module
}

const resourceRoutes = loadRoutes()
resourceRoutes.forEach((route) => {
	routes.push(route[0])
})

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
