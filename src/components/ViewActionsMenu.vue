<script setup>
import { ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import ViewActionsButton from '@/components/ViewActionsButton.vue'
defineProps({
	action: Object,
})

const isMenuOpen = ref(false)

function hideMenu() {
	isMenuOpen.value = false
}

function showMenu() {
	isMenuOpen.value = true
}
</script>

<template>
	<div class="relative">
		<ViewActionsButton :action="action" @click="showMenu" />
		<transition name="fade">
			<OnClickOutside
				class="flex flex-col absolute top-0 right-0 bg-slate-800 shadow z-10"
				v-if="isMenuOpen"
				@trigger="hideMenu"
			>
				<ViewActionsButton
					v-for="(action, index) in action.actions"
					:key="index"
					:action="action"
					@click="hideMenu"
					expand
				/>
			</OnClickOutside>
		</transition>
	</div>
</template>
