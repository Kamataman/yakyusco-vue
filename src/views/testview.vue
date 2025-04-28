<template>
  <ScoreBoard
    :rows="[
      { team: 'チームA', inning1: 1, inning2: 2, inning3: 3, total: 6 },
      { team: 'チームB', inning1: 2, inning2: 3, inning3: 4, total: 9 },
    ]"
    :innings="3"
  />
</template>
<script setup lang="ts">
import ScoreBoard from "@/components/ScoreBoard.vue";
</script>
