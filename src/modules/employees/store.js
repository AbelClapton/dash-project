import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useEmployeesStore = defineStore({
	id: 'employees',
	state: () => ({
		employees: [],
		loading: false,
	}),
	actions: {
		async fetchAll() {
			this.loading = true
			let { data: employees, error } = await supabase
				.from('employees')
				.select('*')
			if (error) return error
			this.employees = employees
			this.loading = false
		},

		async save(employee) {
			this.loading = true
			let { data, error } = await supabase.from('employees').insert([
				{
					name: employee.name,
					phone: employee.phone,
				},
			])
			if (error) return error
			employee.id = data[0].id
			employee.services.forEach(async (service) => {
				let { error } = await supabase.from('employees_services').insert([
					{
						employee: employee.id,
						service: service,
					},
				])
				if (error) console.log(error)
			})
			if (error) {
				console.log(error)
				return error
			}
			this.employees.push(employee)
			this.loading = false
		},

		async update(employee) {
			this.loading = true
			let { error } = await supabase
				.from('employees')
				.update({ name: employee.name, phone: employee.phone })
				.eq('id', employee.id)
			if (error) return error
			const refEmployee = this.get(employee.id)
			refEmployee.services.forEach(async (service) => {
				if (employee.services.includes(service))
					employee.services.remove(service)
				if (!employee.services.includes(service)) {
					error = await supabase
						.from('employees_services')
						.delete()
						.eq('employee', employee.id)
						.eq('service', service)
					if (error) return error
				}
			})
			employee.services.forEach(async (service) => {
				error = await supabase.from('employees_services').insert([
					{
						employee: employee.id,
						service: service,
					},
				])
			})
			if (error) return error
			this.employees[this.employees.findIndex((e) => e.id == employee.id)] =
				employee
			this.loading = false
		},

		async delete(id) {
			this.loading = true
			const { error } = await supabase.from('employees').delete().eq('id', id)
			if (error) return error
			this.employees = this.employees.filter((e) => e.id == id)
			this.loading = false
		},
	},

	getters: {
		get: (state) => (id) => state.employees.find((e) => e.id == id),
	},
})
