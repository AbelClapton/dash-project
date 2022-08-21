<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import TagIcon from '@/components/icons/TagIcon.vue'
import DolarIcon from '@/components/icons/DolarIcon.vue'
import BoxIcon from '@/components/icons/BoxIcon.vue'

const props = defineProps({
	product: Object,
	isSelecting: Boolean,
})

const emit = defineEmits(['selectOn', 'select', 'unselect'])

const isSelected = ref(false)

const enterSelectMode = () => {
	isSelected.value = true
	emit('selectOn', props.product.id)
}

watch(
	() => props.isSelecting,
	(newValue) => {
		if (!newValue) isSelected.value = false
	}
)

const router = useRouter()

const clicked = () => {
	if (props.isSelecting) {
		if (isSelected.value) {
			isSelected.value = false
			emit('unselect', props.product.id)
		} else {
			isSelected.value = true
			emit('select', props.product.id)
		}
	} else {
		router.push({ path: `/products/${props.product.id}` })
	}
}
</script>

<template>
	<div
		class="pt-2 pb-2 px-3 rounded transition-colors"
		:class="[isSelected ? 'bg-cyan-600' : 'bg-slate-800']"
		v-touch:hold="enterSelectMode"
		@click="clicked"
	>
		<span class="font-regular">{{ props.product.name }}</span>
		<div class="flex gap-3">
			<div class="flex  items-center text-gray-300 font-light gap-1">
				<TagIcon class="h-4 w-4" />
				<span class="">{{ props.product.category }}</span>
			</div>
			<div class="flex items-center text-gray-300 font-light">
				<DolarIcon class="h-4 w-4" />
				<span class="">{{ props.product.price }}</span>
			</div>
			<div class="flex items-center text-gray-300 font-light gap-1 pl-1">
				<BoxIcon class="h-4 w-4" />
				<span class="">{{ props.product.stock }}</span>
			</div>
			<div></div>
		</div>
	</div>
</template>
