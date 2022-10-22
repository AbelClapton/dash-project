<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
	brand: {
		type: Object,
		default: () => {},
	},
})

defineEmits(['edit', 'remove'])
</script>

<template>
	<div class="w-full flex items-center py-3 pr-4 pl-6">
		<span class="flex-grow text-lg">{{ brand.name }}</span>
		<button class="p-2" @click="$emit('edit', brand.id, brand.name)">
			<pencil-icon class="h-5 w-5" />
		</button>
		<button class="p-2" @click="$emit('remove', brand.id)">
			<trash-icon class="h-6 w-6 text-red-500" />
		</button>
	</div>
</template>
