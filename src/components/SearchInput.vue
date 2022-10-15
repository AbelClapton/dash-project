<script setup>
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
	modelValue: String,
})
</script>

<template>
	<div class="flex items-center px-3">
		<div class="w-6">
			<MagnifyingGlassIcon class="h-6 w-6 text-gray-400" />
		</div>
		<input
			class="flex-grow py-2 px-3 text-lg bg-transparent focus-visible:outline-none"
			type="text"
			placeholder="Buscar..."
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
		<transition name="fade">
			<button class="w-6" v-show="modelValue !== ''">
				<XMarkIcon class="h-6 w-6" @click="$emit('update:modelValue', '')" />
			</button>
		</transition>
	</div>
</template>
