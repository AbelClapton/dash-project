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
			await this.fetch()
			await this.subscribe()
		},
		async fetch() {
			this.loading = true
			const { data, error } = await supabase.from('products').select()
			console.log(data)
			this.products = data
			this.error = error
			this.loading = false
		},
		async subscribe() {
			this.subscription = supabase
				.from('products')
				.on('INSERT', (payload) => {
					this.products.push(payload)
				})
				.subscribe()
		},
		async unsubscribe() {
			supabase.removeSubscription(this.subscription)
		},
		async delete(id) {
			this.products = this.products.filter((p) => p.id != id)
		},
		async deleteMultiple(ids = []) {
			this.products = this.products.filter((p) => !ids.includes(p.id))
		},
	},
	getters: {
		get: (state) => (id) => state.products.find((p) => p.id == id),
	},
})
