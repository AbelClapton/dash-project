<template>
	<div
		class="h-12 border-t border-dashed border-gray-700 first:border-0"
		@click="$emit('cellSelected', getHour(index - 1), getHour(index), employee)"
	></div>
</template>
