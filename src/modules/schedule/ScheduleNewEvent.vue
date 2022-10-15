<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useSwipe } from '@vueuse/core'

import { useCategoriesStore } from '@/modules/categories/store'
import { useServicesStore } from '@/modules/services/store'

import { Switch } from '@headlessui/vue'
import {
	XMarkIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	ClockIcon,
	UserIcon,
	TicketIcon,
} from '@heroicons/vue/24/outline'

// props
const props = defineProps({
	modelValue: {
		type: Object,
		default: () => ({}),
	},
})

const event = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})

// emits
const emit = defineEmits(['dispose'])

// initialize stores
const categoriesStore = useCategoriesStore()
const servicesStore = useServicesStore()

// TODO: Make composable
const panel = ref(null)
const top = ref(600)
const offset = ref(0)
const titleInput = ref(null)
const bgColor = computed(() =>
	currentBreakpoint.value ? 'bg-neutral-600' : 'bg-neutral-800'
)
const breakpoints = [0, 600, 725]
let currentBreakpoint = ref(1)
const nextBreakpoint = () => {
	if (currentBreakpoint.value < 2) currentBreakpoint.value++
}
const previousBreakpoint = () => {
	if (currentBreakpoint.value) currentBreakpoint.value--
}
watch(currentBreakpoint, (newBreakpoint) => {
	top.value = breakpoints[newBreakpoint]
	if (newBreakpoint === 0)
		nextTick(() => {
			titleInput.value.focus()
		})
})

const dispose = () => {
	currentBreakpoint.value = 0
	setTimeout(() => {
		emit('dispose')
	}, 200)
}

const { direction } = useSwipe(panel, {
	passive: true,
	threshold: 0,
	onSwipe() {
		/* top.value = Math.floor(-lengthY.value) */
	},
	onSwipeEnd() {
		if (direction.value === 'DOWN') nextBreakpoint()
		else previousBreakpoint()
		offset.value = breakpoints[currentBreakpoint.value]
	},
})

onMounted(async () => {
	categoriesStore.fetchAll()
	servicesStore.fetchAll()
})
</script>

<template>
	<div
		class="absolute bottom-0 left-0 right-0 flex flex-col duration-500 transition-all ease-in-out rounded-t-3xl overflow-hidden"
		:class="[bgColor]"
		:style="{ top: `${top}px` }"
		ref="panel"
	>
		<!-- Panel Swipe Area -->
		<div class="flex align-center justify-center" @click="previousBreakpoint">
			<ChevronDownIcon class="h-5 w-5" v-if="currentBreakpoint === 0" />
			<ChevronUpIcon class="h-5 w-5" v-else-if="currentBreakpoint === 1" />
			<div class="h-5 w-10 bg-gray-500" v-else></div>
		</div>

		<!-- Panel Header -->
		<div
			class="w-full flex items-center justify-between p-4 z-10"
			v-if="currentBreakpoint < 2"
		>
			<button class="p-2 text-gray-400 active:rounded-md" @click="dispose">
				<XMarkIcon class="h-7 w-7 stroke-2" />
			</button>
			<button class="bg-cyan-500 py-1 px-3 rounded-full text-lg">
				Guardar
			</button>
		</div>

		<!-- Panel Content -->
		<div class="w-full relative">
			<Transition name="fade">
				<!-- Reduced View -->
				<div
					class="absolute top-0 w-full flex flex-col"
					v-if="currentBreakpoint === 1"
					@click="previousBreakpoint"
				>
					<div class="w-full px-[4.5rem]">
						<div class="w-full bg-transparent text-2xl">
							{{ event.title || 'Añade un título' }}
						</div>
						<p>Hoy &#8226; {{ event.start.time }} - {{ event.end.time }}</p>
					</div>
				</div>

				<!-- Full View -->
				<div
					class="absolute top-0 w-full flex flex-col gap-3"
					v-else-if="currentBreakpoint === 0"
				>
					<div class="w-full px-[4.5rem]">
						<input
							class="text-2xl"
							placeholder="Añade un título"
							v-model="event.title"
							ref="titleInput"
						/>
					</div>
					<hr class="border-gray-500" />
					<div class="flex flex-col gap-2 py-1 items-center px-6">
						<div class="flex gap-[1.25rem] items-center w-full">
							<ClockIcon class="w-7 h-7" />
							<span class="text-lg flex-grow">Todo el día</span>
							<Switch
								v-model="event.isAllDay"
								:class="event.isAllDay ? 'bg-cyan-500' : 'bg-neutral-500'"
								class="relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
							>
								<span
									aria-hidden="true"
									:class="event.isAllDay ? 'translate-x-4' : 'translate-x-0'"
									class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out"
								/>
							</Switch>
						</div>

						<!-- Time -->
						<div class="w-full flex flex-col gap-2 pl-6 -mr-10">
							<div class="flex gap-3 justify-between">
								<input v-model="event.start.date" type="date" />
								<input
									class="inline-flex w-4 p-0"
									v-model="event.start.time"
									type="time"
								/>
							</div>
							<div class="flex gap-3 justify-between">
								<input v-model="event.end.date" type="date" />
								<input v-model="event.end.time" type="time" />
							</div>
						</div>
					</div>
					<hr class="border-gray-500" />

					<!-- Client -->
					<div class="flex flex-col gap-3 px-6 py-1">
						<div class="flex gap-5">
							<UserIcon class="h-7 w-7" />
							<input
								class="placeholder:text-gray-500"
								v-model="event.client.name"
								type="text"
								placeholder="Nombre del Cliente"
							/>
						</div>
						<div class="flex px-12">
							<input
								v-model="event.client.phone"
								type="text"
								placeholder="Telefono del Cliente"
							/>
						</div>
					</div>
					<hr class="border-gray-500" />

					<!-- Service -->
					<div class="w-full flex px-6 py-1">
						<div class="w-full flex gap-5">
							<div class="w-7">
								<TicketIcon class="h-7 w-7" />
							</div>
							<select class="w-full" v-model="event.service.categoryId">
								<option
									v-for="category in categoriesStore.categories"
									:key="category.id"
									:value="category.id"
								>
									{{ category.name }}
								</option>
							</select>
							<select class="w-full">
								<option
									v-for="service in servicesStore.services"
									:key="service.id"
									:value="service.id"
								>
									{{ service.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped>
input {
	@apply bg-transparent text-white placeholder:text-white caret-cyan-500 focus-visible:outline-0;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-in-out;
}

input[type='time'] {
	max-width: none !important;
	width: 4.2rem;
}
</style>
