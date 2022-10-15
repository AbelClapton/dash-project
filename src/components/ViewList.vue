<script setup>
import { ref, computed, watch } from 'vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import ViewListItem from '@/components/ViewListItem.vue'
import { TrashIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import BaseAccordion from './base/BaseAccordion.vue'

const props = defineProps({
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
	action: {
		type: Function,
		default() {
			return
		},
	},
	groups: {
		type: Boolean,
		default: false,
	},
	isSelecting: {
		type: Boolean,
		default: false,
	},
})
const emit = defineEmits(['delete', 'update:isSelecting'])

const isSelectModeOn = computed({
	get: () => props.isSelecting,
	set: (value) => emit('update:isSelecting', value),
})

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
	<!-- TODO: Remake layout for each component -->
	<transition name="list-loader" :duration="600">
		<div class="loader absolute top-1/4 left-1/2" v-if="loading">
			<BaseSpinner class="h-10 w-10 text-cyan-500" />
		</div>

		<!-- TODO: Layout - from top to max height -->
		<!-- Simple View -->
		<div
			class="flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden h-full w-full my-2"
			v-auto-animate
			v-else-if="items.length && !groups"
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

		<!-- Group View -->
		<div
			class="flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-full w-full my-2"
			v-auto-animate
			v-else-if="items.length && groups"
		>
			<BaseAccordion v-for="(group, index) in items" :key="index">
				<template #heading>
					{{ group.name }}
				</template>
				<template #content>
					<div class="w-full flex flex-col gap-2">
						<ViewListItem
							v-for="item in group.items"
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
				</template>
			</BaseAccordion>
		</div>

		<!-- TODO: Layout - centered -->
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
