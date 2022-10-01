<script setup>
import { ref } from 'vue'
import VDatePicker from 'v-calendar'
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'

const date = ref(new Date())
</script>

<template>
  <v-date-picker class="inline-block h-full" v-model="date">
    <template v-slot="{ inputValue, togglePopover }">
      <div class="flex items-center">
        <button
          class="p-2 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-600 rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
          @click="togglePopover()"
        >
         <CalendarDaysIcon class="h-5 w-5" /> 
        </button>
        <input
          :value="inputValue"
          class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500"
          readonly
        />
      </div>
    </template>
  </v-date-picker>
</template>
