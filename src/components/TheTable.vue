<script setup>
import { ref, computed } from "vue";
import BaseTableHeader from "@/components/BaseTableHeader.vue";

const props = defineProps({
  headers: {
    type: Array,
    default() {
      return [];
    },
  },
  data: {
    type: Array,
    default() {
      return [];
    },
  },
});

const filters = ref({
  nombre: "",
});

const filteredData = computed(() => {
  let filtered = props.data.filter(
    (item) =>
      item.nombre.toLowerCase().indexOf(filters.value.nombre.toLowerCase()) >= 0
  );
  filtered.forEach((item) => console.log(item, item.nombre));
  filtered.sort((a, b) => { 
    if (a.nombre > b.nombre) return 1;
    return -1;
  });
  return filtered;
});

const activeHeader = ref("nombre");

const headerClicked = (header) => {
  activeHeader.value = header;
};
</script>

<template>
  <table class="table-fixed w-full text-center">
    <thead>
      <tr class="bg-slate-900 text-white leading-8">
        <BaseTableHeader
          v-for="header in props.headers"
          :key="header"
          :header="header"
          :active="header.toLowerCase() == activeHeader.toLowerCase()"
          @clicked="headerClicked"
        />
      </tr>
    </thead>
    <tbody>
      <tr
        class="even:bg-slate-300 leading-8"
        v-for="item in filteredData"
        :key="item.id"
      >
        <td>{{ item.nombre }}</td>
        <td>{{ item.categoria }}</td>
        <td>{{ item.cantidad }}</td>
        <td>{{ item["u/m"] }}</td>
      </tr>
    </tbody>
  </table>
</template>
