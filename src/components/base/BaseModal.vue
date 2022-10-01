<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['disclose'])

function close() {
  isOpen.value = value
}
</script>

<template>
  <Dialog :open="isOpen" @close="close">
    <DialogPanel>
      <DialogTitle>Deactivate account</DialogTitle>
      <DialogDescription>
        This will permanently deactivate your account
      </DialogDescription>

      <p>
        Are you sure you want to deactivate your account? All of your data will be
        permanently removed. This action cannot be undone.
      </p>

      <button @click="$emit('disclose')">Aceptar</button>
      <button @click="$emit('disclose')">Cancelar</button>
    </DialogPanel>
  </Dialog>
</template>
