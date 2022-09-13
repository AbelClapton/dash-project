import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'
import useRaiseToast from '@/composables/useRaiseToast.js'

const supabase = useClient()
const { success, error } = useRaiseToast()

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
			if (err) error(err)
			else this.categories = categories
			this.loading = false
		},

		async save(category) {
			this.loading = true
			const { data, error: err } = await supabase
				.from('categories')
				.insert([category])
			if (err) error(err)
			else {
				this.categories.push(data[0])
				success('Categoría registrada')
			}
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
			const { err } = await supabase.from('categories').delete().eq('id', id)
			if (err) error(err)
			else this.categories = this.categories.filter((e) => e.id != id)
			this.loading = false
		},
	},
	getters: {
		get: (state) => (id) => state.categories.find((e) => e.id == id),
	},
})
