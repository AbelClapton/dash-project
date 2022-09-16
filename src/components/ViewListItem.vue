<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	isSelecting: {
		type: Boolean,
		default: false,
	},
	item: Object,
	action: Function,
})
const emit = defineEmits(['selectOn', 'select', 'unselect'])
const isSelected = ref(false)

const enterSelectMode = () => {
	isSelected.value = true
	emit('selectOn', props.item.id)
}

const clicked = () => {
	if (props.isSelecting) {
		if (isSelected.value) emit('unselect', props.item.id)
		else emit('select', props.item.id)
		isSelected.value = !isSelected.value
	} else {
		props.action(props.item.id)
	}
}

watch(
	() => props.isSelecting,
	(newValue) => {
		if (!newValue) isSelected.value = false
	}
)
</script>

<template>
	<div
		class="flex justify-between items-center p-4 rounded"
		:class="[isSelected ? 'bg-cyan-600' : 'bg-slate-800']"
		v-touch:hold="enterSelectMode"
		@click="clicked"
	>
		<slot></slot>
	</div>
</template>
