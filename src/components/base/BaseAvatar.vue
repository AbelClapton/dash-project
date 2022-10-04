<script setup>
import { computed } from 'vue'
const props = defineProps({
	user: Object,
	alt: String,
})

const initials = computed(() => {
	return props.user.name
		.split(' ')
		.slice(0, 2)
		.map((el) => el.slice(0, 1).toUpperCase())
		.join('')
})
</script>

<template>
	<div
		class="flex flex-wrap justify-center h-12 w-12 rounded-full bg-slate-500"
	>
		<!-- Profile Picture -->
		<div class="" v-if="user.picture">
			<img
				:src="user.picture"
				alt="..."
				class="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
			/>
		</div>

		<!-- Name Fallback -->
		<div class="flex items-center text-light" v-else>{{ initials }}</div>
	</div>
</template>
