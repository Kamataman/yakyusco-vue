<template>
  <InputAtbatResult v-model:atbatResults="data" />
</template>
<script setup lang="ts">
import { AtbatResultClass } from "@/adapters/adapter";
import { ref } from "vue";
import InputAtbatResult from "@/components/InputAtbatResults.vue";

const data = ref<AtbatResultClass[]>([
  {
    inning: 1,
    result: "K",
    position: 1,
    is_scpos: true,
  },
  {
    inning: 3,
    result: "K",
    position: 1,
    is_scpos: true,
  },
]);
</script>
