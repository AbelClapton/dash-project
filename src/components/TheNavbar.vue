<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconCross from '@/components/icons/IconCross.vue'
import BaseButton from '@/components/BaseButton.vue'
import { titleCase } from '@/utils/titleCase.js'

const open = ref(false)
const links = ref([
	{ name: 'Inicio', link: '/' },
	{ name: 'Productos', link: '/products' },
	{ name: 'Finanzas', link: '/products' },
	{ name: 'Reservaciones', link: '/products' },
])
const toggleMenu = () => {
	open.value = !open.value
}

const route = useRoute()
const currentView = computed(() => {
	return route.name ? ` - ${titleCase(route.name)}` : ''
})
</script>

<template>
	<div
		class="bg-slate-900 text-slate-200 py-3.5 px-6 shadow md:flex justify-between items-center"
	>
		<!-- Logo section -->
		<div class="flex items-center">
			<span class="text-green-500 text-xl mr-1">
				<IconLogo class="h-6 w-6" />
			</span>
			<h1 class="text-xl">Store {{ currentView }}</h1>
		</div>
		<!-- End of logo section -->

		<span
			class="absolute md:hidden right-6 top-4 cursor-pointer"
			@click="toggleMenu"
		>
			<IconMenu v-if="!open" class="h-6 w-6" />
			<IconCross v-else class="h-6 w-6" />
		</span>

		<!-- Links Section -->
		<ul
			class="md:flex md:items-center md:px=0 px-10 md:pb-0 pb-10 md:static absolute bg-gray-900 md:w-auto w-full top-14 duration-75 ease-in z-20"
			:class="[open ? 'left-0' : 'left-[-100%]']"
		>
			<li class="md:mx-4 md:my-0 my-6" v-for="link in links" :key="link.name">
				<router-link
					:to="link.link"
					class="text-xl md:text-lg hover:text-green-500"
					@click="toggleMenu"
					>{{ link.name }}</router-link
				>
			</li>
			<BaseButton> Get Started </BaseButton>
		</ul>
		<!-- End of Links Section -->
	</div>
</template>
