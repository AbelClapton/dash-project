<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
	category: {
		type: Object,
		default: () => {},
	},
})

defineEmits(['edit', 'remove'])
</script>

<template>
	<div class="w-full flex items-center justify-between py-3 pr-4 pl-5">
		<span class="text-lg">{{ category.name }}</span>
		<div class="flex items-center gap-2">
			<button class="p-2" @click="$emit('edit', category.id, category.name)">
				<pencil-icon class="h-5 w-5 text-gray-300" />
			</button>
			<button class="p-2" @click="$emit('remove', category.id)">
				<trash-icon class="h-5 w-5 text-red-500" />
			</button>
		</div>
	</div>
</template>
