import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useModulesStore = defineStore({
	id: 'modules',
	state: () => ({
		modules: [],
	}),
	actions: {
		async fetchAll() {
			let { data: modules, error } = await supabase.from('modules').select('*')
			if (error) return error
			this.modules = modules
		},
		async save(module) {
			const { error } = await supabase.from('modules').insert([module])
			if (error) return error
			this.modules = this.modules.push(module)
		},
		async update(module) {
			const { error } = await supabase.from('modules').insert([module])
			if (error) return error
			this.modules = this.modules.push(module)
		},
		async delete(id) {
			const { error } = await supabase.from('modules').delete().eq('id', id)
			if (error) return error
			this.modules = this.modules.filter((e) => e.id == id)
		},
	},
	getters: {
		get: (state) => (id) => state.modules.find((e) => e.id == id),
	},
})
