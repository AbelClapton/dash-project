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

defineEmits(['dispose'])
</script>

<template>
	<div
		class="absolute top-0 right-0 bottom-0 left-0 touch-none text-white z-50"
	>
		<div class="h-screen w-screen bg-gray-800 rounded-t-2xl">
			<div class="py-4">
				<div class="flex flex-col">
					<div class="flex items-center justify-end p-4">
						<!-- TODO: Avatar and Profile -->
						<button class="py-2 px-3 rounded" @click="$emit('dispose')">
							Atrás
						</button>
					</div>
					<router-link
						to="/products"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<ArchiveBoxIcon class="h-5 w-5" />
						<span>Inventario</span>
					</router-link>
					<router-link
						to="/brands"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<ShoppingBagIcon class="h-5 w-5" />
						<span>Marcas</span>
					</router-link>
					<router-link
						to="/categories"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<TagIcon class="h-5 w-5" />
						<span>Categorías</span>
					</router-link>
					<router-link
						to="/finance"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<BanknotesIcon class="h-5 w-5" />
						<span>Finanzas</span>
					</router-link>
					<router-link
						to="/schedule"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<CalendarDaysIcon class="h-5 w-5" />
						<span>Reservaciones</span>
					</router-link>
					<router-link
						to="/employees"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<UserGroupIcon class="h-5 w-5" />
						<span>Empleados</span>
					</router-link>
					<router-link
						to="/services"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<TicketIcon class="h-5 w-5" />
						<span>Servicios</span>
					</router-link>
					<router-link
						to="/modules"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
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
