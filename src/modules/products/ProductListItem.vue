<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
	product: Object,
})

defineEmits(['remove'])
</script>

<template>
	<div class="w-full py-3 px-4 flex justify-between relative">
		<div class="flex flex-col">
			<div
				class="absolute top-0 bottom-0 left-0 w-1 rounded-l bg-red-500"
				v-if="product.warningThreshold > product.stock"
			/>
			<div class="text-lg flex flex-wrap gap-2">
				<span>{{ product.name }}</span>
				<span>&bull;</span>
				<span class="font-medium text-cyan-500">{{ product.brand }}</span>
			</div>
			<div class="flex gap-6 text-sm">
				<p>
					precio:
					<span class="text-white font-light">${{ product.price }}</span>
				</p>
				<p>
					stock: <span class="text-white font-light">{{ product.stock }}</span>
				</p>
			</div>
		</div>

		<!-- TODO: make this actions available through swipe left/right -->
		<div class="flex items-center gap-2">
			<button
				class="p-2"
				@click="$router.push({ path: `/products/${product.id}/edit` })"
			>
				<pencil-icon class="h-5 w-5" />
			</button>
			<button class="p-2" @click="$emit('remove', product.id, product.name)">
				<trash-icon class="h-6 w-6 text-red-500" />
			</button>
		</div>
	</div>
</template>
