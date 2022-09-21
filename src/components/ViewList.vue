<script setup>
import { ref, watch } from 'vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ViewListItem from '@/components/ViewListItem.vue'
import { TrashIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'

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
const emit = defineEmits(['delete'])

const isSelectModeOn = ref(false)
const isSearchModeOn = ref(false)
const selectedItems = ref([])

function selectOn(id) {
	isSelectModeOn.value = true
	selectedItems.value.push(id)
}

function selectOff() {
	isSelectModeOn.value = false
	selectedItems.value = []
}

function select(id) {
	selectedItems.value.push(id)
}

function unselect(id) {
	selectedItems.value = selectedItems.value.filter((i) => i !== id)
}

function deleteSelected() {
	emit('delete', selectedItems.value)
	isSelectModeOn.value = false
	selectedItems.value = []
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
				:isSelecting="isSelectModeOn"
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

	<!-- Select Mode Actions -->
	<transition name="slide">
		<div
			class="absolute -bottom-1 flex items-center justify-between left-0 z-10 w-full h-16 bg-gray-700 px-4"
			v-if="isSelectModeOn"
		>
			<ChevronLeftIcon class="h-5 w-5 text-gray-400" @click="selectOff" />
			<div class="text-gray-400">
				{{ selectedItems.length || 0 }} seleccionados
			</div>
			<TrashIcon class="h-5 w-5 text-red-400" @click="deleteSelected" />
		</div>
	</transition>
	<!-- End of Select Mode Actions -->

	<!-- Search Mode -->
	<div
		class="absolute -bottom-1 left-0 z-10 w-full h-16 bg-gray-800 flex items-center px-3"
		v-show="isSearchModeOn"
		ref="searchDiv"
	>
		<MagnifyingGlassIcon class="h-7 w-7 p-1 rounded text-gray-400" />
		<input
			class="bg-gray-800 border-0 outline-0 h-full flex-grow pl-3"
			type="text"
			ref="searchInput"
			placeholder="Buscar por nombre"
			@input="onSearchInput($event)"
		/>
		<XMarkIcon
			class="h-7 w-7 p-1 rounded text-gray-400"
			@click="isSearchModeOn = false"
		/>
	</div>
	<!-- End of Search Mode -->
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
