<script setup lang="ts">
import router from "../router";
const gameresults = [
  {
    date: "4月1日",
    score: "3対1",
  },
  {
    date: "5月2日",
    score: "10対3",
  },
];

const i = router.currentRoute.value.params.gameResultId;
let gameresult;
if (typeof i === "string" && parseInt(i) < gameresults.length) {
  gameresult = gameresults[parseInt(i)];
} else {
  gameresult = {
    date: "",
    score: "",
  };
}
</script>

<template>
  {{ $route.params.id }}
  <h3>{{ gameresult.date }} の試合結果</h3>
  {{ gameresult.score }}でした。
  <q-btn
    label="編集"
    color="primary"
    @click="
      $router.push({
        name: 'editgameresult',
        params: {
          team: $route.params.team,
          gameResultId: $route.params.gameResultId,
        },
      })
    "
  />
</template>
