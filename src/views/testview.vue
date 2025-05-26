<template>
  <ScoreBoard v-model:rows="data" :innings="innings" :isEdit="isEdit" />
</template>
<script setup lang="ts">
import { type ScoreBoardRow } from "@/adapters/adapter";
import { ref } from "vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
const data = ref<ScoreBoardRow[]>([
  {
    team: "先攻チーム",
    total: 1,
    inning1: 1,
    inning2: 2,
  },
  {
    team: "後攻チーム",
    total: 1,
    inning1: 1,
    inning2: 2,
  },
]);

const innings = ref(2);
const isEdit = ref(true);
</script>
