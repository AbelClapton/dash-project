<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useSwipe } from '@vueuse/core'
import {
	XMarkIcon,
	ChevronDownIcon,
	ChevronUpIcon,
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

// data
const panel = ref(null)
const top = ref(0)
const titleInput = ref(null)
const bgColor = computed(() =>
	currentBreakpoint.value ? 'bg-neutral-600' : 'bg-neutral-700'
)
const breakpoints = [0, 600, 725]
let currentBreakpoint = ref(0)

// methods
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
	currentBreakpoint.value = 2
	setTimeout(() => {
		emit('dispose')
	}, 200)
}

const { isSwiping, direction } = useSwipe(panel, {
	passive: true,
	threshold: 0,
	onSwipeEnd() {
		if (direction.value === 'DOWN') nextBreakpoint()
		else previousBreakpoint()
	},
})
</script>

<template>
	<div
		class="absolute bottom-0 left-0 right-0 flex flex-col duration-300 ease-in-out rounded-t-3xl overflow-hidden"
		:class="[{ 'transition-all': !isSwiping }, bgColor]"
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
				<div
					class="top-0 w-full flex flex-col"
					v-if="currentBreakpoint === 1"
					@click="previousBreakpoint"
				>
					<div class="w-full px-16">
						<div class="w-full bg-transparent text-2xl font-medium">
							{{ event.title || 'Añade un título' }}
						</div>
						<p>Hoy - {{ event.start }} - {{ event.end }}</p>
					</div>
				</div>
				<div
					class="top-0 w-full flex flex-col"
					v-else-if="currentBreakpoint === 0"
				>
					<div class="w-full px-16">
						<input
							class="w-full text-white placeholder:text-white caret-cyan-500 bg-transparent text-2xl font-medium focus-visible:outline-0 focus-visible:border-0"
							placeholder="Añade un título"
							v-model="event.title"
							ref="titleInput"
						/>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease-in-out;
}
</style>
