<script setup>
import { RouterLink } from 'vue-router'
import {
	CalendarDaysIcon,
	TagIcon,
	ShoppingBagIcon,
	UserGroupIcon,
	BanknotesIcon,
	ArchiveBoxIcon,
	TicketIcon,
	RectangleStackIcon,
} from '@heroicons/vue/24/outline'

defineEmits(['close'])
</script>

<template>
	<div class="touch-none text-white">
		<div class="absolute right-6 top-6" @click="$emit('close')">Atras</div>
		<div class="h-screen w-screen bg-gray-800 rounded-t-2xl">
			<div class="py-4">
				<div class="flex flex-col">
					<router-link
						to="/products"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<ArchiveBoxIcon class="h-5 w-5" />
						<span>Inventario</span>
					</router-link>
					<router-link
						to="/brands"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<ShoppingBagIcon class="h-5 w-5" />
						<span>Marcas</span>
					</router-link>
					<router-link
						to="/categories"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<TagIcon class="h-5 w-5" />
						<span>Categorías</span>
					</router-link>
					<router-link
						to="/finance"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<BanknotesIcon class="h-5 w-5" />
						<span>Finanzas</span>
					</router-link>
					<router-link
						to="/appointments"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<CalendarDaysIcon class="h-5 w-5" />
						<span>Reservaciones</span>
					</router-link>
					<router-link
						to="/employees"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<UserGroupIcon class="h-5 w-5" />
						<span>Empleados</span>
					</router-link>
					<router-link
						to="/services"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<TicketIcon class="h-5 w-5" />
						<span>Servicios</span>
					</router-link>
					<router-link
						to="/modules"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('close')"
					>
						<RectangleStackIcon class="h-5 w-5" />
						<span>Paquetes</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.router-link-active {
	@apply bg-slate-600;
}

span {
	@apply font-light;
}
</style>
