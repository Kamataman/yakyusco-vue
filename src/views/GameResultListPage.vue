<template>
  <BaseLayout
    ><template #title>試合結果一覧</template>
    <template #default>
      <template v-if="gameResults.length === 0">
        <div class="text-h6">選手が登録されていません。</div>
      </template>
      <template v-else>
        <div
          class="game-result-detail"
          v-for="(result, i) in gameResults"
          :key="result.id"
        >
          <div class="team-info">
            <RouterLink :to="`gameresult/${result.id}`">
              <div class="column items-center">
                <GameResultCard
                  :is-edit="false"
                  :win-lose="result.winlose"
                  :is-ff="result.is_ff"
                  :ff-team-name="result.ff_Team_name"
                  :bf-team-name="result.bf_Team_name"
                  :date="result.date"
                  :place="result.place"
                  :innings="result.innings"
                  :score-board-row="scoreBoardRows[i]"
                ></GameResultCard>
              </div>

              <!-- <p>
                <strong>
                  {{ result.bf_Team_name }} vs {{ result.ff_Team_name }}</strong
                  >
                  
                  {{ getWinLoseExpression(result.winlose) }}
                </p>
                <ScoreBoard :rows="scoreBoardRows[i]" :innings="result.innings" /> -->
            </RouterLink>
          </div>
        </div>
      </template>
      <div class="flex justify-end" style="margin: 10px">
        <q-btn
          label="+"
          color="primary"
          @click="
            $router.push({
              name: 'addgameresult',
              params: { team: $route.params.team },
            })
          "
        />
      </div> </template
  ></BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // useRouteをインポート
import axiosInstance from "@/plugins/axios"; // axios設定をインポート

import BaseLayout from "@/components/BaseLayout.vue";

import type { GameResult } from "@/adapters/adapter.ts";
import { transformGameResultToScoreData } from "@/adapters/adapter.ts"; // アダプターをインポート
import GameResultCard from "@/components/GameResultCard.vue";

const route = useRoute(); // 現在のルート情報を取得
const teamId = route.params.team as string; // URLのパラメータからteamを取得

const gameResults = ref<GameResult[]>([]);

const scoreBoardRows = ref<
  Array<{ team: string; total: number; [key: string]: number | string }>[]
>([]);

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/teams/${teamId}/gameresults/`); // APIエンドポイントを指定
    gameResults.value = response.data;
    console.log("試合結果:", gameResults.value);

    // 各試合結果をスコアボード用データに変換
    gameResults.value.forEach((gameResult) => {
      scoreBoardRows.value.push(
        transformGameResultToScoreData({
          bf_Team_name: gameResult.bf_Team_name,
          ff_Team_name: gameResult.ff_Team_name,
          bf_runs: gameResult.bf_runs,
          ff_runs: gameResult.ff_runs,
        })
      );
    });
  } catch (error) {
    console.error("試合結果の取得に失敗しました:", error);
  }
});
</script>
