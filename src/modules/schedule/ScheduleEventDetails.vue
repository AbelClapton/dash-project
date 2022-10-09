<script setup>
import { useRoute } from 'vue-router'
import {
	BellIcon,
	CalendarDaysIcon,
	UserIcon,
	PhoneIcon,
	XMarkIcon,
	PencilIcon,
	EllipsisVerticalIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const eventId = route.params.id
</script>

<template>
	<BaseView class="p-4 bg-gray-800">
		<template #header>
			<button @click="$router.back()">
				<XMarkIcon class="h-6 w-6 text-gray-300" />
			</button>
		</template>
		<template #actions>
			<button><PencilIcon class="h-5 w-5 text-gray-300" /></button>
			<button><EllipsisVerticalIcon class="h-6 w-6 text-gray-300" /></button>
		</template>
		<div class="flex flex-col gap-6">
			<div class="flex flex-wrap gap-3">
				<span class="bg-cyan-500 h-5 w-5 rounded-md mt-1"></span>
				<div class="flex flex-col gap-2">
					<h3 class="font-normal text-2xl">Event Title</h3>
					<span class="font-light">Hoy -</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<UserIcon class="h-6 w-6 stroke-1" />
				<div>
					<h6 class="text-lg font-medium">Cliente</h6>
					<span class="font-light">Abel Rodriguez Tapia</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<PhoneIcon class="h-6 w-6 stroke-1" />
				<div>
					<h6 class="text-lg font-medium">Teléfono</h6>
					<span class="font-light">+53 58587694</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<BellIcon class="h-6 w-6 stroke-1" />
				<span class="font-light">30 minutos antes</span>
			</div>
			<div class="flex items-center gap-3">
				<CalendarDaysIcon class="h-6 w-6 stroke-1" />
				<span>Relacionados</span>
			</div>
			<details>
				<div class="flex flex-col gap-2 py-2">
					<div
						class="flex items-center py-2 px-4 gap-3 rounded border border-gray-500"
					>
						<span>Sesión de cejas</span>
						<div class="flex flex-grow items-center gap-1">
							<span class="text-2xl text-gray-400 pt-1">&#8226;</span>
							<span>30 mins</span>
						</div>
						<div
							class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-lg font-regular"
						>
							AR
						</div>
					</div>
				</div>
			</details>
		</div>
	</BaseView>
</template>
