import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useCategoriesStore = defineStore({
	id: 'categories',
	state: () => ({
		categories: [],
		loading: false,
	}),
	actions: {
		async fetchAll() {
			this.loading = true
			let { data: categories, error: err } = await supabase
				.from('categories')
				.select('*')
			if (!err) this.categories = categories
			this.loading = false
		},

		async save(category) {
			this.loading = true
			const { data, error: err } = await supabase
				.from('categories')
				.insert([category])
			if (!err) this.categories.push(data[0])
			this.loading = false
		},

		async update(category) {
			this.loading = true
			const { error } = await supabase
				.from('categories')
				.update(category)
				.eq('id', category.id)

			if (!error) {
				const index = this.categories.findIndex((e) => e.id == category.id)
				this.categories[index].name = category.name
			}
			this.loading = false
		},

		async remove(id) {
			this.loading = true
			const { error: err } = await supabase
				.from('categories')
				.delete()
				.eq('id', id)
			if (!err) this.categories = this.categories.filter((e) => e.id != id)
			this.loading = false
		},
	},
	getters: {
		get: (state) => (id) => state.categories.find((e) => e.id == id),
	},
})
