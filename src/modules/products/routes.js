export default [
	{
		path: '/products',
		name: 'products',
		component: () => import('@/modules/products/ProductsIndex.vue'),
	},
	{
		path: '/products/:id',
		name: 'product-details',
		component: () => import('@/modules/products/ProductDetails.vue'),
	},
	{
		path: '/products/:id/edit',
		name: 'edit-product',
		component: () => import('@/modules/products/ProductNew.vue'),
	},
	{
		path: '/add-product',
		name: 'add-product',
		component: () => import('@/modules/products/ProductNew.vue'),
	},
]
