<script setup>
import { DotsVerticalIcon, PlusIcon } from '@heroicons/vue/outline'
</script>

<template>
	<div class="h-full">
		<div class="flex items-center justify-between">
			<div class="text-lg font-semibold h-5">Reservaciones</div>
			<div class="flex items-center gap-2">
				<button @click="create">
					<PlusIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</button>
				<button @click="create">
					<DotsVerticalIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</button>
			</div>
		</div>
	</div>
</template>
