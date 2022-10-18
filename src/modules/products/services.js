import useClient from '@/libraries/supabase'
import log from '@/utils/logger'
import { useBrandsStore } from '@/modules/brands/store'

const supabase = useClient()
const brandsStore = useBrandsStore()

export async function getAll() {
	const { data: products, error } = await supabase.from('products').select('*')

	if (error) log.error('ProductsServices::getProduct', error)
	else return products.map((p) => (p.brand = brandsStore.get(p.brandId)))
}
export async function getProduct(id ') {
	const { data: product, error } = await supabase.from('products').select('*').eq('id', id)

	console.log(product)

	if (error) log.error('ProductsServices::getProduct', error)
	else return products.map((p) => (p.brand = brandsStore.get(p.brandId)))
}
