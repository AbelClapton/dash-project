import { defineStore } from 'pinia'
import useClient from '@/libraries/supabase.js'
import useRaiseToast from '@/composables/useRaiseToast.js'

const supabase = useClient()
const { success, error } = useRaiseToast()

export const useBrandsStore = defineStore({
	id: 'brands',
	state: () => ({
		brands: [],
		loading: false,
	}),
	actions: {
		async fetchAll() {
			this.loading = true
			let { data: brands, error: err } = await supabase
				.from('brands')
				.select('*')
			if (err) error(err)
			else this.brands = brands
			this.loading = false
		},

		async save(brand) {
			this.loading = true
			const { data, error: err } = await supabase.from('brands').insert([brand])
			if (err) error(err)
			else {
				this.brands.push(data[0])
				success('Marca registrada')
			}
			this.loading = false
		},

		async update(brand) {
			this.loading = true
			const { error } = await supabase
				.from('brands')
				.update(brand)
				.eq('id', brand.id)

			if (!error) {
				const index = this.brands.findIndex((e) => e.id == brand.id)
				this.brands[index].name = brand.name
			}
			this.loading = false
		},

		async remove(id) {
			this.loading = true
			const { err } = await supabase.from('brands').delete().eq('id', id)
			if (err) error(err)
			else this.brands = this.brands.filter((e) => e.id != id)
			this.loading = false
		},
	},
	getters: {
		get: (state) => (id) => state.brands.find((e) => e.id == id),
	},
})
