<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { useClientsStore } from '@/stores/clients.js'
import { useServicesStore } from '@/stores/services.js'
import { useModulesStore } from '@/stores/modules.js'
import BaseInput from '@/components/base/BaseInput.vue'

const appointment = ref({
  client: {
    name: '',
    phone: '',
  },
  date: new Date(),
  start_time: new Date(),
  end_time: new Date(),
  modules: [],
})

const route = useRoute()
const router = useRouter()

const page = ref(1)
const appointmentsStore = useAppointmentsStore()
const clientsStore = useClientsStore()
const servicesStore = useServicesStore()
const modulesStore = useModulesStore()

const save = async () => {
  await appointmentsStore.save(appointment.value)
  router.back()
}

const modules = computed(() =>
  modulesStore.modules.map((m) => {
    m.name = `${m.name} - ${servicesStore.get(m.service).name}`
    return m
  })
)

onMounted(async () => {
  if (!appointmentsStore.appointments.length) await appointmentsStore.fetchAll()
  if (!clientsStore.clients.length) await clientsStore.fetchAll()
  if (!servicesStore.services.length) await servicesStore.fetchAll()
  if (!modulesStore.modules.length) await modulesStore.fetchAll()
})
</script>

<template>
  <div>
    <h1 class="font-medium text-lg">
      {{ route.params.id ? 'Editar' : 'Nueva' }} Reservación
    </h1>
    <br />
    <div
      class="p-2 flex flex-col grow justify-between gap-4"
      v-if="page === 1"
      >
      <div class="flex flex-col gap-4">
        <BaseInput
          label="Nombre"
          type="date"
          placeholder="Nombre del cliente"
          v-model="appointment.client.name"
        />
        <BaseInput
          label="Teléfono"
          type="text"
          placeholder="Teléfono"
          v-model="appointment.client.phone"
        />
        <BaseInput
        label="Fecha"
        type="date"
        placeholder="Elija una fecha"
        v-model="appointment.date"
        />
      </div>
      <div class="text-end pt-6">
        <input
          class="bg-cyan-500 text-lg font-medium text-white py-3 px-6 rounded-lg"
          @click="page = 2"
          value="Siguiente"
        />
      </div>
    </div>
    <div
      class="p-2 flex flex-col grow justify-between gap-4"
      v-if="page === 1"
    >
    </div>
  </div>
</template>
