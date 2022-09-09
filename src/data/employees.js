import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'

const supabase = useClient()

export const useEmployeesStore = defineStore({
	id: 'employees',
	state: () => ({
		employees: [],
	}),
	actions: {
		async fetchAll() {
			let { data: employees, error } = await supabase
				.from('employees')
				.select('*')
			if (error) return error
			this.employees = employees
		},
		async save(employee) {
			let { data, error } = await supabase.from('employees').insert([
				{
					name: employee.name,
					phone: employee.phone,
				},
			])
			if (error) return error
			console.log(data)
			employee.services.forEach(async (service) => {
				error = await supabase.from('employees_services').insert([
					{
						employee: data.id,
						service: service,
					},
				])
			})
			if (error) return error
			this.employees = this.employees.push(employee)
		},
		async update(employee) {
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
			this.employees = this.employees.splice(
				this.employees.findIndex((e) => e.id == employee.id),
				1,
				employee
			)
		},
		async delete(id) {
			const { error } = await supabase.from('employees').delete().eq('id', id)
			if (error) return error
			this.employees = this.employees.filter((e) => e.id == id)
		},
	},
	getters: {
		get: (state) => (id) => state.employees.find((e) => e.id == id),
	},
})
