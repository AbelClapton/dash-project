<script setup>
import { computed } from 'vue'
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const props = defineProps({
	options: {
		type: Array,
		default() {
			return []
		},
	},
	modelValue: {
		type: [String, Number, Array],
		default: '',
	},
	placeholder: {
		type: String,
		default: 'Seleccionar',
	},
	multiple: Boolean,
	label: {
		type: [String, Boolean],
		default: false,
	},
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['update:modelValue'])

const label = computed(() => {
	return props.options
		.filter((option) =>
			Array.isArray(props.modelValue)
				? props.modelValue.includes(option.id)
				: props.modelValue === option.id
		)
		.map((option) => option.name)
		.join(', ')
})
</script>

<template>
	<div class="w-full text-lg">
		<label class="font-light" v-if="props.label">{{ props.label }}:</label>
		<Listbox
			:multiple="props.multiple"
			@update:modelValue="(value) => $emit('update:modelValue', value)"
			:model-value="props.modelValue"
			class="w-full"
		>
			<div class="relative">
				<ListboxButton
					class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
				>
					<span class="block truncate font-light text-black" v-if="label">{{
						label
					}}</span>
					<span class="font-light text-gray-400" v-else>{{
						props.placeholder
					}}</span>
					<span
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
					>
						<SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</ListboxButton>
				<transition
					leave-active-class="transition duration-100 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<ListboxOptions
						class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
					>
						<ListboxOption
							v-slot="{ active, selected }"
							v-for="option in options"
							:key="option.id"
							:value="option.id"
							as="template"
						>
							<li
								:class="[
									active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
									'relative cursor-default py-2 pl-10 pr-4',
								]"
							>
								<span
									:class="[
										selected ? 'font-medium' : 'font-normal',
										'block truncate',
									]"
									>{{ option.name }}</span
								>
								<span
									v-if="selected"
									class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
								>
									<CheckIcon class="h-5 w-5" aria-hidden="true" />
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</div>
		</Listbox>
	</div>
</template>
