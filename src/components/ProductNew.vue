<script setup></script>

<template>
  <div class="h-screen">
    <h1 class="text-xl">Registrar Producto</h1>
    <hr class="my-4" />
    <div class="p-2">
      <label for="nombre">Nombre:</label
      ><input
        class="border block w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
        type="text"
      />
    </div>
    <div class="p-2">
      <label for="categoria">Categoria:</label
      ><select
        class="border block w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
        type="select"
      >
        <option value="higiene">Higiene</option>
        <option value="miscelaneo">Miscelaneo</option>
        <option value="comida">Comida</option>
      </select>
    </div>
    <div class="p-2">
      <label for="precio">Precio:</label
      ><input
        class="border block w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
        type="number"
      />
    </div>
    <div class="p-2">
      <label for="costo">Costo:</label
      ><input
        class="border block w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
        type="number"
      />
    </div>
    <div class="p-2">
      <label for="cantidad">Cantidad:</label
      ><input
        class="border w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
        type="number"
      />
    </div>
    <div class="p-2">
      <label for="um">U/M:</label>
      <select
        class="border w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
        name="um"
      >
        <option value="unidades">Unidades</option>
        <option value="lt">Litros</option>
        <option value="lb">Libras</option>
      </select>
    </div>
    <hr class="mt-6 mb-4" />
    <div class="p-2 text-end">
      <button class="bg-sky-600 text-white text-lg rounded py-4 px-8">Guardar</button>
    </div>
  </div>
</template>
