<script setup>
defineProps({
	service: Object,
})
</script>

<template>
	<div class="w-full flex items-center justify-between py-3 pr-4 pl-5">
		<span class="text-lg">{{ service.name }}</span>
	</div>
</template>
