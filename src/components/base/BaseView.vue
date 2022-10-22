<script setup>
import { Bars3Icon } from '@heroicons/vue/24/outline'

defineEmits(['toggleNavbar'])
</script>

<template>
	<div class="h-full flex flex-col pb-3">
		<!-- View Header -->
		<div class="h-8 flex items-center justify-start m-4 gap-3">
			<button class="grid place-content-center" @click="$emit('toggleNavbar')">
				<Bars3Icon class="h-7 w-7" />
			</button>
			<div class="flex-grow flex items-center text-xl font-normal h-5">
				<slot name="header"></slot>
			</div>
			<div class="flex items-center gap-3">
				<slot name="actions"></slot>
			</div>
		</div>

		<!-- View Content -->
		<div class="h-full overflow-x-hidden overflow-y-auto">
			<slot name="content"></slot>
		</div>
	</div>
</template>
