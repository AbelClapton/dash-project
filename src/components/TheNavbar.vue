<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
	CalendarDaysIcon,
	UserGroupIcon,
	BanknotesIcon,
	ArchiveBoxIcon,
	TicketIcon,
} from '@heroicons/vue/24/outline'

defineEmits(['dispose'])

const links = ref([
	{ label: 'Inventario', to: '/products', icon: ArchiveBoxIcon },
	{ label: 'Finanzas', to: '/finances', icon: BanknotesIcon },
	{ label: 'Reservaciones', to: '/schedule', icon: CalendarDaysIcon },
	{ label: 'Empleados', to: '/employees', icon: UserGroupIcon },
	{ label: 'Servicios', to: '/services', icon: TicketIcon },
])
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
						v-for="link in links"
						:key="link.label"
						:to="link.to"
						class="flex items-center gap-4 hover:bg-slate-600 px-6 py-3"
						@click="$emit('dispose')"
					>
						<component :is="link.icon" class="h-5 w-5" />
						<span>{{ link.label }}</span>
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
