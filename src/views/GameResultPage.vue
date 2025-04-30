<template>
  <BaseLayout
    ><template #title>試合結果</template>
    <template #default>
      <div class="column items-center">
        <div class="column">
          <q-card>
            <q-card-section>
              <div class="q-pa-sm">
                {{ getWinLoseExpression(gameResult.winlose) }}
              </div>
              <div class="text-h6 q-pa-xs">
                <template v-if="gameResult.is_ff"
                  >vs {{ gameResult.bf_Team_name }}</template
                >
                <template v-else>vs {{ gameResult.ff_Team_name }}</template>
              </div>
              <div class="q-pa-sm">
                <div>日時： {{ gameResult.date }}</div>
                <div>場所： {{ gameResult.place }}</div>
              </div>
            </q-card-section>
            <q-card-section>
              <ScoreBoard :rows="scoreBoardRow" :innings="gameResult.innings" />
            </q-card-section>
            <q-card-section>
              {{ gameResult.review }}
            </q-card-section>
          </q-card>
        </div>
        <div class="column">
          <BattingResult />
        </div>
        <div class="column">
          <PitchingResult />
        </div>
      </div>
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
      /> </template
  ></BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axiosInstance from "@/plugins/axios";
import router from "@/router";

import ScoreBoard from "@/components/ScoreBoard.vue";
import BattingResult from "@/components/BattingResult.vue";
import PitchingResult from "@/components/PitchingResult.vue";
import BaseLayout from "@/components/BaseLayout.vue";

import type { GameResult, ScoreBoardRow } from "@/adapters/adapter";
import {
  transformGameResultToScoreData,
  getWinLoseExpression,
} from "@/adapters/adapter";

const gameResult = ref<GameResult>({
  is_ff: true,
  bf_Team_name: "",
  ff_Team_name: "",
  winlose: "",
  innings: 0,
  bf_total_runs: 0,
  ff_total_runs: 0,
  review: "",
  place: "",
  date: "",
  bf_runs: [],
  ff_runs: [],
  team_id: "",
  id: 0,
  is_X: false,
});
const scoreBoardRow = ref<ScoreBoardRow[]>([
  {
    team: "",
    total: 0,
  },
  {
    team: "",
    total: 0,
  },
]);

onMounted(async () => {
  const gameresult_id = router.currentRoute.value.params.gameResultId;

  try {
    const response = await axiosInstance.get(`/gameresults/${gameresult_id}`);
    gameResult.value = response.data;

    // 各試合結果をスコアボード用データに変換
    if (gameResult.value) {
      scoreBoardRow.value = transformGameResultToScoreData({
        bf_Team_name: gameResult.value.bf_Team_name,
        ff_Team_name: gameResult.value.ff_Team_name,
        bf_runs: gameResult.value.bf_runs,
        ff_runs: gameResult.value.ff_runs,
      });
    }
  } catch (error) {
    console.error("試合結果の取得に失敗しました:", error);
  }
});
</script>
