<script setup>
import { ref } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
</script>

<template>
	<div class="h-full flex flex-col gap-6">
		<!-- View Header -->
		<div class="h-8 flex items-center justify-start gap-2">
			<div
				class="flex-grow text-lg font-semibold h-5 flex items-center justify-start"
			>
				<slot name="header">View Name</slot>
			</div>
			<div class="flex items-center justify-end gap-3">
				<slot name="actions"></slot>
			</div>
		</div>

		<!-- View Content -->
		<div class="h-full container mx-auto overflow-hidden">
			<slot></slot>
		</div>
	</div>
</template>
