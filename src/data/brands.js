import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useBrandsStore = defineStore({
	id: 'brands',
	state: () => ({
		brands: [],
		error: null,
		loading: false,
		subscription: null,
	}),
	actions: {
		async init() {
			this.loading = true
			// Fetch data
			const { data, error } = await supabase.from('brands').select('*')

			this.brands = data
			this.error = error

			// Subscribe to changes
			this.subscription = supabase
				.from('brands')
				.on('INSERT', (payload) => {
					this.brands.push(payload.new)
				})
				.on('UPDATE', (payload) => {
					this.brands.splice(
						this.brands.findIndex((p) => p.id === payload.new.id),
						1,
						payload.new
					)
				})
				.on('DELETE', (payload) => {
					this.brands.splice(
						this.brands.findIndex((p) => p.id === payload.old.id),
						1
					)
				})
				.subscribe()

			this.loading = false
		},
		unsubscribe() {
			supabase.removeSubscription(this.subscription)
		},
		async save(brand) {
			this.loading = true
			const { error } = await supabase.from('brands').insert([brand])
			this.error = error
			this.loading = false
		},
		async update(brand) {
			const { error } = await supabase
				.from('brands')
				.update(brand)
				.match({ id: brand.id })
			this.error = error
		},
		async delete(id) {
			this.loading = true
			this.error = await supabase.from('brands').delete().match({ id })
			this.loading = false
		},
		async deleteMultiple(ids = []) {
			ids.forEach(async (id) => {
				await this.delete(id)
			})
		},
	},
	getters: {
		get: (state) => (id) => state.brands.find((p) => p.id == id).name,
	},
})
