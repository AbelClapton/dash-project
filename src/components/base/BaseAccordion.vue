<script setup>
import { ref } from 'vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const isExpanded = ref(false)

const toggle = () => {
	isExpanded.value = !isExpanded.value
}
</script>

<template>
	<div class="w-full flex flex-col items-start justify-start gap-2">
		<div class="w-full flex items-center justify-start gap-2">
			<span><slot name="heading"></slot></span>

			<!-- TODO: animate chevron with rotate effect -->
			<div @click="toggle">
				<ChevronUpIcon v-if="isExpanded" class="h-5 w-5" />
				<ChevronDownIcon v-else class="h-5 w-5" />
			</div>
		</div>

		<!-- TODO: animate expansion toggle -->
		<slot v-if="isExpanded" name="content"></slot>
	</div>
</template>
