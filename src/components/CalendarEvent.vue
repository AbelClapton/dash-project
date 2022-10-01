<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  event: Object,
})

const styleObject = ref({
  height: '100px',
  top: 0,
})

const calculateTop = () => {
  const sh = parseInt(props.event.start.slice(0,2)) 
  return `${1 + (sh - 8) * 3.25}rem`
  //return `${(sh - 8) * 8}rem`
}

const calculateHeight = () => {
  const s = new Date(`2000-01-01T${props.event.start}:00`)
  const e = new Date(`2000-01-01T${props.event.end}:00`)

  const h = ((e - s) / (15 * 60 * 1000) * 0.75)
  return `${h}rem`
}

onMounted(() => {
  console.log('height: ', calculateHeight(), ', duration: ', props.event.start, '-', props.event.end)
  styleObject.value.height = calculateHeight()
  styleObject.value.top = calculateTop()
})
</script>

<template>
  <div
    class="w-16 absolute left-6 mt-0.5 ml-0.5"
    :style="styleObject"
  >
    <div class="h-full w-full bg-cyan-500 rounded flex items-center justify-center">
      <span class="text-center">
        {{ event.title }}
      </span>
    </div>
  </div>
</template> 
