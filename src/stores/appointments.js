import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useAppointmentsStore = defineStore({
	id: 'appointments',
	state: () => ({
		appointments: [],
		loading: false,
	}),
	actions: {
		async fetchAll() {
			this.loading = true
			let { data: appointments, error: err } = await supabase
				.from('appointments')
				.select('*')
			if (!err) this.appointments = appointments
			this.loading = false
		},

		async save(appointment) {
			this.loading = true
			const { data, error: err } = await supabase
				.from('appointments')
				.insert([appointment])
			if (!err) this.appointments.push(data[0])

			this.loading = false
		},

		async update(appointment) {
			this.loading = true
			const { error } = await supabase
				.from('appointments')
				.update(appointment)
				.eq('id', appointment.id)

			if (!error) {
				const index = this.appointments.findIndex((e) => e.id == appointment.id)
				this.appointments[index].name = appointment.name
			}
			this.loading = false
		},

		async remove(id) {
			this.loading = true
			const { err } = await supabase.from('appointments').delete().eq('id', id)
			if (!err) this.appointments = this.appointments.filter((e) => e.id != id)
			this.loading = false
		},
	},
	getters: {
		get: (state) => (id) => state.appointments.find((e) => e.id == id),
	},
})
