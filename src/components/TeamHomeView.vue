<script setup lang="ts">
import router from "../router";

const teams = [
  {
    id: "sampleteam",
    name: "サンプルチーム",
  },
  {
    id: "jesus",
    name: "ジーザス",
  },
];
const team = teams.find(
  (_) => _.id === router.currentRoute.value.params.team
) || { id: "none", name: "なし" };
</script>

<template>
  <h1>{{ team.name }}</h1>
  <p>Home View!</p>
</template>
