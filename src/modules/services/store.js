import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useServicesStore = defineStore({
	id: 'services',
	state: () => ({
		services: [],
		loading: false,
	}),
	actions: {
		async fetchAll() {
			this.loading = true
			let { data: services, error } = await supabase
				.from('services')
				.select('*')
			if (error) console.log(error)
			else this.services = services
			this.loading = false
		},

		async save(service) {
			this.loading = true
			const { data, error } = await supabase.from('services').insert([service])
			if (!error) this.services.push(data[0])
			this.loading = true
		},

		async update(service) {
			this.loading = true
			const { error } = await supabase
				.from('services')
				.update(service)
				.eq('id', service.id)
			if (!error) {
				const index = this.services.findIndex((s) => s.id == service.id)
				this.services[index].name = service.name
			}
			this.loading = false
		},

		async delete(id) {
			this.loading = true
			const { error } = await supabase.from('services').delete().eq('id', id)
			if (!error) this.services = this.services.filter((s) => s.id != id)
			this.loading = false
		},
	},
	getters: {
		get: (state) => (id) => state.services.find((s) => s.id == id),
	},
})
