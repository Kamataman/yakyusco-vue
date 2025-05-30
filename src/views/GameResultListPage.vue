<template>
  <BaseLayout
    ><template #title>試合結果一覧</template>
    <template #default>
      <template v-if="isLoading"><LoadingComponent /></template
      ><template v-else>
        <template v-if="gameResults.length === 0">
          <div class="text-h6">試合結果が登録されていません。</div>
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
      </template>
      <template v-if="isEditable">
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
          /></div
      ></template> </template
  ></BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router"; // useRouteをインポート
import { axiosInstance } from "@/plugins/axios"; // axios設定をインポート
import { userTeamId } from "@/auth";

import BaseLayout from "@/components/BaseLayout.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

import { GameResultClass } from "@/adapters/adapter.ts"; // アダプターをインポート
import GameResultCard from "@/components/GameResultCard.vue";

const route = useRoute(); // 現在のルート情報を取得
const teamId = route.params.team as string; // URLのパラメータからteamを取得

const gameResults = ref<GameResultClass[]>([]);

const scoreBoardRows = ref<
  Array<{ team: string; total: number; [key: string]: number | string }>[]
>([]);

const isEditable = computed<boolean>(() => {
  return teamId === userTeamId.value;
}); // 編集可能かどうか
const isLoading = ref<boolean>(true); // ローディング状態

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/teams/${teamId}/gameresults/`);
    response.data.forEach((res: any) => {
      gameResults.value.push(new GameResultClass(res));
    });

    // 各試合結果をスコアボード用データに変換
    gameResults.value.forEach((gameResult) => {
      scoreBoardRows.value.push(gameResult.transformGameResultToScoreData());
    });
    isLoading.value = false; // データ取得完了後にローディングを終了
  } catch (error) {
    console.error("試合結果の取得に失敗しました:", error);
  }
});
</script>
