<script setup>
import { ref } from 'vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import { OnClickOutside } from '@vueuse/components'

import ViewActionsButton from '@/components/ViewActionsButton.vue'

const isMenuVisible = ref(false)
const showMenu = () => (isMenuVisible.value = true)
const hideMenu = () => (isMenuVisible.value = false)
</script>

<template>
	<div class="relative">
		<view-actions-button @click="showMenu">
			<ellipsis-vertical-icon class="h-7 w-7" />
		</view-actions-button>
		<transition name="fade">
			<on-click-outside
				class="flex flex-col absolute top-0 right-0 bg-slate-800 shadow z-10"
				v-if="isMenuVisible"
				@trigger="hideMenu"
			>
				<slot></slot>
			</on-click-outside>
		</transition>
	</div>
</template>
