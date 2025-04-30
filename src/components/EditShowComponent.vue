<template>
  <template v-if="isEdit">
    <q-input v-model="model" filled dense item-aligned></q-input>
  </template>
  <template v-else> {{ model }}</template>
</template>
<script setup lang="ts">
defineProps<{ isEdit: boolean }>();
const model = defineModel<string | number>();
</script>
