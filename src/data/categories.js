import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useCategoriesStore = defineStore({
	id: 'categories',
	state: () => ({
		categories: [],
		error: null,
		loading: false,
		subscription: null,
	}),
	actions: {
		async init() {
			this.loading = true
			// Fetch data
			const { data, error } = await supabase.from('categories').select('*')

			this.categories = data
			this.error = error

			// Subscribe to changes
			this.subscription = supabase
				.from('categories')
				.on('INSERT', (payload) => {
					this.categories.push(payload.new)
				})
				.on('UPDATE', (payload) => {
					this.categories.splice(
						this.categories.findIndex((p) => p.id === payload.new.id),
						1,
						payload.new
					)
				})
				.on('DELETE', (payload) => {
					this.categories.splice(
						this.categories.findIndex((p) => p.id === payload.old.id),
						1
					)
				})
				.subscribe()

			this.loading = false
		},
		unsubscribe() {
			supabase.removeSubscription(this.subscription)
		},
		async save(category) {
			this.loading = true
			const { error } = await supabase.from('categories').insert([category])
			this.error = error
			this.loading = false
		},
		async update(category) {
			const { error } = await supabase
				.from('categories')
				.update(category)
				.match({ id: category.id })
			this.error = error
		},
		async delete(id) {
			this.loading = true
			this.error = await supabase.from('categories').delete().match({ id })
			this.loading = false
		},
		async deleteMultiple(ids = []) {
			ids.forEach(async (id) => {
				await this.delete(id)
			})
		},
	},
	getters: {
		get: (state) => (id) => state.categories.find((p) => p.id == id).name,
	},
})
