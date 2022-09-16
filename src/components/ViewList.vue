<script setup>
import { ref, watch } from 'vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ViewListItem from '@/components/ViewListItem.vue'

defineProps({
	items: {
		type: Array,
		default() {
			return []
		},
	},
	loading: {
		type: Boolean,
		default: false,
	},
	action: Function,
})

const isSelecting = ref(false)
const selectedItems = ref([])

function selectOn(id) {
	isSelecting.value = true
	selectedItems.value.push(id)
}

function selectOff() {
	isSelecting.value = false
	selectedItems.value = []
}

function select(id) {
	selectedItems.value.push(id)
}

function unselect(id) {
	selectedItems.value = selectedItems.value.filter((i) => i !== id)
}

watch(selectedItems, (newValue) => {
	if (newValue.length === 0) selectOff()
})
</script>

<template>
	<transition name="list-loader" :duration="600">
		<div class="loader absolute top-1/4 left-1/2" v-if="loading">
			<BaseSpinner class="h-10 w-10 text-cyan-500" />
		</div>
		<div
			class="flex flex-col gap-1 overflow-y-auto overflow-x-hidden h-full w-full my-2 -mx-2"
			v-auto-animate
			v-else-if="items.length"
		>
			<ViewListItem
				v-for="item in items"
				:key="item.id"
				:item="item"
				:action="action"
				:isSelecting="isSelecting"
				@selectOn="selectOn"
				@select="select"
				@unselect="unselect"
			>
				<slot name="item-body" :item="item"></slot>
			</ViewListItem>
		</div>
		<div v-else class="text-gray-500">
			<slot name="no-items-message"></slot>
		</div>
	</transition>
</template>

<style>
.list-loader-enter-from :not(.loader),
.list-loader-leave-to :not(.loader) {
	opacity: 0;
}

.list-loader-enter-active :not(.loader),
.list-loader-leave-active :not(.loader) {
	transition: opacity 0.3s ease;
}

.list-loader-enter-from .loader,
.list-loader-leave-to .loader {
	transform: translateY(-50%);
}

.list-loader-enter-active .loader,
.list-loader-leave-active .loader {
	transition: transform 0.3s ease;
}
</style>
