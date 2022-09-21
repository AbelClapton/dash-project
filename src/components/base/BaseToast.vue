<script setup>
import { onMounted } from 'vue'
import { useToastsStore } from '@/stores/toasts.js'
import {
	CheckCircleIcon,
	ExclamationTriangleIcon,
	ExclamationCircleIcon,
	XMarkIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
	toast: {
		required: true,
		type: Object,
	},
})

const toastsStore = useToastsStore()

onMounted(() => {
	setTimeout(() => {
		dismiss()
	}, 5000)
})

const dismiss = () => {
	toastsStore.clearToast(props.toast.title)
}
</script>

<template>
	<div
		class="flex items-center gap-4 px-4 py-2 bg-slate-800 shadow rounded max-w-[300px]"
	>
		<CheckCircleIcon
			v-if="toast.type === 'success'"
			class="h-8 w-8 text-green-500"
		/>
		<ExclamationTriangleIcon
			v-else-if="toast.type === 'info'"
			class="h-8 w-8 text-yellow"
		/>
		<ExclamationCircleIcon v-else class="h-8 w-8 text-red" />
		<div class="flex flex-col text-white">
			<div class="flex justify-between" :class="toast.type">
				<h3>{{ toast.title }}</h3>
			</div>
			<div class="font-light text-sm">
				<p>{{ toast.message }}</p>
			</div>
		</div>
		<XMarkIcon class="h-6 w-6 text-gray-500" @click="dismiss" />
	</div>
</template>
