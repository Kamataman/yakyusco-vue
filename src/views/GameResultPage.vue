<template>
  <BaseLayout
    ><template #title>試合結果</template>
    <template #default>
      <div v-if="!isAdd">編集モード<q-toggle v-model="isEdit" /></div>
      <GameResultCard
        :is-edit="isEdit"
        :win-lose="gameResult.winlose"
        :is-ff="gameResult.is_ff"
        :ff-team-name="gameResult.ff_Team_name"
        :bf-team-name="gameResult.bf_Team_name"
        :date="gameResult.date"
        :place="gameResult.place"
        :innings="gameResult.innings"
        :review="gameResult.review"
        :score-board-row="scoreBoardRow"
      ></GameResultCard>
      <div class="column">
        <BattingResult />
      </div>
      <div class="column">
        <PitchingResult />
      </div>
      <div v-if="isAdd">
        <q-btn color="primary" label="保存" />
      </div> </template
  ></BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axiosInstance from "@/plugins/axios";
import router from "@/router";

import BattingResult from "@/components/BattingResult.vue";
import PitchingResult from "@/components/PitchingResult.vue";
import BaseLayout from "@/components/BaseLayout.vue";

import type { GameResult, ScoreBoardRow } from "@/adapters/adapter";
import { transformGameResultToScoreData } from "@/adapters/adapter";
import GameResultCard from "@/components/GameResultCard.vue";

const props = defineProps<{
  isAdd: Boolean;
}>();
const isEdit = ref<boolean>(false);

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
  if (props.isAdd) {
    isEdit.value = true;
  } else {
    isEdit.value = false;
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
  }
});
</script>
