<script setup>
defineProps({
  label: String,
  modelValue: {
    type: [String, Date, Number],
    default: '',
  },
})
</script>

<template>
  <div class="w-full">
    <label class="font-light" v-if="label">{{ label }}:</label>
    <input
      class="pl-3 py-2 text-lg text-black font-light w-full border rounded-lg"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('update:modelValue', $event.target.value)"
      autocomplete="off"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped>
input[type="date"], input[type="time"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
