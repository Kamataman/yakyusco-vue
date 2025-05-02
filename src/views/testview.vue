<template>
  <ShowAtbatResult :atbat-result="data[1]"></ShowAtbatResult>
</template>
<script setup lang="ts">
import { AtbatResultClass } from "@/adapters/adapter";
import { ref } from "vue";
import InputAtbatResult from "@/components/InputAtbatResults.vue";
import ShowAtbatResult from "@/components/ShowAtbatResult.vue";
const data = ref<AtbatResultClass[]>([
  {
    inning: 1,
    result: "K",
    position: 1,
    is_scpos: true,
  },
  {
    inning: 3,
    result: "1H",
    position: 7,
    is_scpos: false,
  },
]);
</script>
