<script setup></script>

<template>
	<div class="bg-gray-800">
		<div class="text-sm font-semibold h-5">Registrar Producto</div>
		<hr class="my-4" />
		<div class="p-2">
			<label class="text-white" for="nombre">Nombre:</label
			><input
				class="border block w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
				type="text"
			/>
		</div>
		<div class="p-2">
			<label class="text-white" for="categoria">Categoria:</label
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
			<label class="text-white" for="precio">Precio:</label
			><input
				class="border block w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
				type="number"
			/>
		</div>
		<div class="p-2">
			<label class="text-white" for="costo">Costo:</label
			><input
				class="border block w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
				type="number"
			/>
		</div>
		<div class="p-2">
			<label class="text-white" for="cantidad">Cantidad:</label
			><input
				class="border w-full px-3 sm:text-sm border-gray-300 rounded-md py-2"
				type="number"
			/>
		</div>
		<div class="p-2">
			<label class="text-white" for="um">U/M:</label>
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
			<button class="bg-sky-600 text-white text-lg rounded py-4 px-8">
				Guardar
			</button>
		</div>
	</div>
</template>
