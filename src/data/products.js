import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useProductsStore = defineStore({
	id: 'products',
	state: () => ({
		products: [],
		error: null,
		loading: false,
		subscription: null,
	}),
	actions: {
		async init() {
			this.loading = true
			// Fetch data
			const { data, error } = await supabase.from('products').select('*')

			this.products = data
			this.error = error

			// Subscribe to changes
			this.subscription = supabase
				.from('products')
				.on('INSERT', (payload) => {
					this.products.push(payload.new)
				})
				.on('UPDATE', (payload) => {
					this.products.splice(
						this.products.findIndex((p) => p.id === payload.old.id),
						1,
						payload.new
					)
				})
				.on('DELETE', (payload) => {
					this.products.splice(
						this.products.findIndex((p) => p.id === payload.old.id),
						1
					)
				})
				.subscribe()

			this.loading = false
		},
		unsubscribe() {
			supabase.removeSubscription(this.subscription)
		},
		async save(product) {
			this.loading = true
			const { error } = await supabase.from('products').insert([product])
			this.error = error
			this.loading = false
		},
		async update(product) {
			const { error } = await supabase
				.from('products')
				.update(product)
				.match({ id: product.id })
			this.error = error
		},
		async delete(id) {
			this.loading = true
			this.error = await supabase.from('products').delete().match({ id })
			this.loading = false
		},
		async deleteMultiple(ids = []) {
			ids.forEach(async (id) => {
				await this.delete(id)
			})
		},
	},
	getters: {
		get: (state) => (id) => state.products.find((p) => p.id == id),
	},
})
