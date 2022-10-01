<script setup>
import { ref, onMounted } from 'vue'
import PlusButton from '@/components/PlusButton.vue'
import CalendarEvent from '@/components/CalendarEvent.vue'
import BaseModal from './base/BaseModal.vue';

const isModalOpen = ref(false)
const markers = ref([])
const events = ref([
  { id: 1, title:"Turno 1", start: "08:00", end: "09:00" },
  { id: 2, title:"Turno 1", start: "10:00", end: "11:00" },
  { id: 3, title:"Turno 1", start: "12:00", end: "12:30" },
  { id: 4, title:"Turno 1", start: "09:45", end: "10:00" },
])

onMounted(() => {
  let h = 8
  for (let i = 0; i < 22; i++) {
    let H = h + Math.floor(i/2)
    if (H < 10) H = `0${H}`
    markers.value.push(`${H}:${i%2===0?'00':'30'}`)
  }
})

</script>

<template>
  <div class="h-full w-full flex overflow-y-auto relative">  
    <div class="flex flex-col gap-1.5 border-r pr-6 pt-1.5">
      <span
        class="text-gray-400 font-light text-sm"
        v-for="(marker, index) in markers"
        :key="index"
      >
        {{ marker }}
      </span>
    </div>
    <div class="h-full w-full pt-4 pl-2 -ml-6 relative">
      <div 
        class="h-[1.625rem] w-full border-t-[0.5px] even:border-t-gray-500"
        v-for="(_, index) in markers" 
        :key="index"
      >
      </div>
      <CalendarEvent
        v-for="event in events"
        :key="event.id"
        :event="event"
        @click="alert('clicked')"
      />
    </div>
    <BaseModal :isOpen="isModalOpen" />
    <PlusButton />
  </div>
</template>

<style scoped>
span {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
