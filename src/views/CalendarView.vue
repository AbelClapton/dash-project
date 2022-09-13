<script setup>
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/vue/24/outline'
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
					<EllipsisVerticalIcon class="h-7 w-7 p-1 rounded hover:bg-gray-600" />
				</button>
			</div>
		</div>
	</div>
</template>
