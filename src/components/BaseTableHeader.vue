<script setup>
import { ref } from "vue";
import IconCaretUp from "@/components/icons/IconCaretUp.vue";
import IconCaretDown from "@/components/icons/IconCaretDown.vue";

const props = defineProps({
  header: String,
  active: Boolean,
});

const emit = defineEmits(["clicked"]);

const sortAsc = ref(false);

const clicked = () => {
  if (props.active) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortAsc.value = false;
  }
  emit("clicked", props.header);
};
</script>

<template>
  <th class="cursor-pointer" @click="clicked">
    <div class="flex items-center justify-center gap-1">
      <span>{{ props.header }}</span>
      <IconCaretUp v-if="props.active && sortAsc" class="h-2.5 w-2.5" />
      <IconCaretDown v-else-if="props.active && !sortAsc" class="h-2.5 w-2.5" />
    </div>
  </th>
</template>
