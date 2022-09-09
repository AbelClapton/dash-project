import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useServicesStore = defineStore({
	id: 'services',
	state: () => ({
		services: [],
	}),
	actions: {
		async fetchAll() {
			let { data: services, error } = await supabase
				.from('services')
				.select('*')
			if (error) return error
			this.services = services
		},
		async save(service) {
			const { error } = await supabase.from('services').insert([service])
			if (error) return error
			this.services = this.services.push(service)
		},
		async update(service) {
			const { error } = await supabase.from('services').insert([service])
			if (error) return error
			this.services = this.services.push(service)
		},
		async delete(id) {
			const { error } = await supabase.from('services').delete().eq('id', id)
			if (error) return error
			this.services = this.services.filter((e) => e.id == id)
		},
	},
	getters: {
		get: (state) => (id) => state.services.find((e) => e.id == id),
	},
})
