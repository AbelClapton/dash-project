<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployeesStore } from '@/modules/employees/store'
import { ArrowPathIcon, PhoneIcon } from '@heroicons/vue/24/outline'

import ViewList from '@/components/ViewList.vue'
import ViewActions from '@/components/ViewActions.vue'
import ViewActionsMenu from '@/components/ViewActionsMenu.vue'
import ViewActionsButton from '@/components/ViewActionsButton.vue'
import FloatingButton from '@/components/FloatingButton.vue'

const router = useRouter()
const employeesStore = useEmployeesStore()
const isSelecting = ref(false)

const fetchEmployees = async () => {
	await employeesStore.fetchAll()
}

const action = (id) => {
	router.push({ path: `/employees/${id}` })
}

onMounted(async () => {
	await fetchEmployees()
})
</script>

<template>
	<base-view>
		<template #header>Empleados</template>
		<template #actions>
			<view-actions>
				<view-actions-menu>
					<view-actions-button label="Actualizar" @click="fetchEmployees">
						<arrow-path-icon class="h-7 w-7" />
					</view-actions-button>
				</view-actions-menu>
			</view-actions>
		</template>
		<template #content>
			<div class="px-4">
				<view-list
					:items="employeesStore.employees"
					:loading="employeesStore.loading"
					:action="action"
					v-model:isSelecting="isSelecting"
				>
					<template #item-body="{ item }">
						<div class="flex gap-4 px-3 py-3">
							<base-avatar :user="item" />
							<div class="flex flex-col">
								<span class="font-regular"> {{ item.name }} </span>
								<div class="flex items-center gap-2">
									<phone-icon class="h-4 w-4" />
									<span class="font-regular"> {{ item.phone }} </span>
								</div>
							</div>
						</div>
					</template>
				</view-list>
			</div>

			<transition name="floating-button">
				<floating-button
					v-show="!isSelecting"
					class="absolute bottom-3 right-3"
					@click="$router.push({ path: '/add-employee' })"
				/>
			</transition>
		</template>
	</base-view>
</template>
