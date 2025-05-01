<template>
  <PitchingResult v-model:pitchingresultModel="data" :isEdit="isEdit" />
</template>
<script setup lang="ts">
import type { PitchingResultClass } from "@/adapters/adapter";
import PitchingResult from "@/components/PitchingResult.vue";
import { ref } from "vue";

const isEdit = ref(false);

const data = ref<PitchingResultClass[]>([
  {
    innings: 5,
    pitchs: 80,
    batters: 20,
    hits: 3,
    homeruns: 1,
    strikeouts: 5,
    walks: 2,
    hit_by_pitch: 0,
    balks: 0,
    runs: 2,
    earned_runs: 2,
    result: "W",
    pitching_order: 1,
    player_id: 2,
    player_number: "11",
    player_name: "たろう",
  },
  {
    innings: 5,
    pitchs: 80,
    batters: 20,
    hits: 3,
    homeruns: 1,
    strikeouts: 5,
    walks: 2,
    hit_by_pitch: 0,
    balks: 0,
    runs: 2,
    earned_runs: 2,
    result: "W",
    pitching_order: 1,
    player_id: 2,
    player_number: "11",
    player_name: "たろう",
  },
]);
</script>
