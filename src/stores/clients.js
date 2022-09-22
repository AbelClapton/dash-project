import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useClientsStore = defineStore({
	id: 'clients',
	state: () => ({
		clients: [],
		loading: false,
	}),
	actions: {
		async fetchAll() {
			this.loading = true
			let { data: clients, error: err } = await supabase
				.from('clients')
				.select('*')
			if (!err) this.clients = clients
			this.loading = false
		},

		async save(client) {
			this.loading = true
			const { data, error: err } = await supabase
				.from('clients')
				.insert([client])
			if (!err) this.clients.push(data[0])

			this.loading = false
		},

		async update(client) {
			this.loading = true
			const { error } = await supabase
				.from('clients')
				.update(client)
				.eq('id', client.id)

			if (!error) {
				const index = this.clients.findIndex((e) => e.id == client.id)
				this.clients[index].name = client.name
			}
			this.loading = false
		},

		async remove(id) {
			this.loading = true
			const { err } = await supabase.from('clients').delete().eq('id', id)
			if (!err) this.clients = this.clients.filter((e) => e.id != id)
			this.loading = false
		},
	},
	getters: {
		get: (state) => (id) => state.clients.find((e) => e.id == id),
	},
})
