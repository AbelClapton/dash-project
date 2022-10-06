<script setup>
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

const animate = ref(false)

const onClick = () => {
  animate.value = true
  setTimeout(() => {
      animate.value = false
  }, 1000)
}
</script>

<template>
  <div
    class="flex rigth items-center justify-center rounded-full bg-cyan-500 h-[3.5rem] w-[3.5rem] z-10 float"
    @click="onClick"
  >
    <div class="absolute rounded-full w-2/3 h-2/3 bg-cyan-500 opacity-0"
    :class="{ 'animate-ping': animate, 'opacity-75': animate }"></div>
    <PlusIcon class="h-7 w-7 text-white" />
  </div>
</template>
