import { useBrandsStore } from '@/stores/brands.js'
import { describe, it, expect } from 'vitest'

const brandsStore = useBrandsStore()

describe('Brands Store', () => {
	it('Check initial state', () => {
		expect(brandsStore).toBeDefined()
		expect(brandsStore.brands).toBeDefined()
		expect(brandsStore.brands).toHaveLength(0)
	})
})
