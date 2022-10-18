import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'
const supabase = useClient()

export const useProductsStore = defineStore({
	id: 'products',
	state: () => ({
		products: [],
		loading: false,
	}),
	actions: {
		async fetchAll() {
			this.loading = true
			let { data: products, error: err } = await supabase
				.from('products')
				.select('*')
			if (!err) this.products = products
			this.loading = false
		},

		async save(product) {
			this.loading = true
			const { data, error: err } = await supabase
				.from('products')
				.insert([product])
			if (!err) this.products.push(data[0])
			this.loading = false
		},

		async update(product) {
			this.loading = true
			const { error } = await supabase
				.from('products')
				.update(product)
				.eq('id', product.id)

			if (!error) {
				const index = this.products.findIndex((e) => e.id == product.id)
				this.products[index] = { ...product }
			}
			this.loading = false
		},

		async remove(id) {
			this.loading = true
			const { error: err } = await supabase
				.from('products')
				.delete()
				.eq('id', id)
			if (!err) this.products = this.products.filter((e) => e.id != id)
			this.loading = false
		},
	},
	getters: {
		get: (state) => (id) => state.products.find((e) => e.id == id),
	},
})
