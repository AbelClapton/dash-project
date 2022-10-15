import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useCategoriesStore = defineStore({
	id: 'modules',
	state: () => ({
		categories: [],
	}),
	actions: {
		async fetchAll() {
			let { data: modules, error } = await supabase.from('modules').select('*')
			if (error) return error
			this.categories = modules
		},
		async save(module) {
			const { data, error } = await supabase.from('modules').insert([module])
			if (error) return error
			this.categories.push(data[0])
		},
		async update(module) {
			const { error } = await supabase.from('modules').update([module])
			if (error) return error
			this.categories.push(module)
		},
		async delete(id) {
			const { error } = await supabase.from('modules').delete().eq('id', id)
			if (error) return error
			this.categories = this.categories.filter((e) => e.id != id)
		},
	},
	getters: {
		get: (state) => (id) => state.categories.find((e) => e.id == id),
		fetchByService: (state) => (service) =>
			state.categories.filter((e) => e.service == service),
	},
})
