<template>
  <BaseLayout
    ><template #title>試合結果</template>
    <template #default>
      <div v-if="!isAdd && isEditable">
        編集モード<q-toggle
          v-model="isEditting"
          @update:model-value="(value:boolean, ) => saveGameResult(value)"
        />
      </div>
      <GameResultCard
        :is-edit="isEditting"
        v-model:winLose="gameResult.winlose"
        v-model:is-ff="gameResult.is_ff"
        v-model:ff-team-name="gameResult.ff_Team_name"
        v-model:bf-team-name="gameResult.bf_Team_name"
        v-model:date="gameResult.date"
        v-model:place="gameResult.place"
        v-model:innings="gameResult.innings"
        v-model:review="gameResult.review"
        v-model:score-board-row="scoreBoardRow"
      ></GameResultCard>
      <div class="column q-pa-sm">
        <h2 class="text-h5 q-mb-md">打撃成績</h2>
        <BattingResult
          v-model:battingResultModel="gameResult.batting_results"
          :isEdit="isEditting"
          :innings="gameResult.innings"
        />
      </div>
      <div class="column q-pa-sm">
        <h2 class="text-h5 q-mb-md">投手成績</h2>
        <PitchingResult
          v-model:pitchingresultModel="gameResult.pitching_results"
          :isEdit="isEditting"
        />
      </div>
      <div v-if="isAdd">
        <q-btn color="primary" label="保存" @click="saveGameResult()" />
      </div> </template
  ></BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { axiosInstance, authAxiosInstance } from "@/plugins/axios";
import router from "@/router";
import { userTeamId } from "@/auth";

import BattingResult from "@/components/BattingResultTable.vue";
import PitchingResult from "@/components/PitchingResultsTable.vue";
import BaseLayout from "@/components/BaseLayout.vue";

import type { ScoreBoardRow } from "@/adapters/adapter";
import { getTeamIdFromUrl, GameResultClass } from "@/adapters/adapter";
import GameResultCard from "@/components/GameResultCard.vue";

const props = defineProps<{
  isAdd: Boolean;
}>();
const isEditting = ref<boolean>(false);

const gameResult = ref<GameResultClass>(new GameResultClass());
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
const isEditable = ref<boolean>(false); // 編集可能かどうか

onMounted(async () => {
  if (props.isAdd) {
    isEditting.value = true;
    gameResult.value.team_id = getTeamIdFromUrl();
  } else {
    isEditting.value = false;
    const gameresult_id = router.currentRoute.value.params.gameResultId;
    try {
      const response = await axiosInstance.get(`/gameresults/${gameresult_id}`);
      gameResult.value = new GameResultClass(response.data);

      // 各試合結果をスコアボード用データに変換
      if (gameResult.value) {
        scoreBoardRow.value = gameResult.value.transformGameResultToScoreData();
      }
      // gameResult.value.date = new Date(gameResult.value.date); // クラスの中で初期化するようにする

      isEditable.value = gameResult.value.team_id === userTeamId.value;
    } catch (error) {
      console.error("試合結果の取得に失敗しました:", error);
    }
  }
});

function saveGameResult(newValue: boolean | undefined = undefined) {
  gameResult.value.getScoreDataForGameResult(scoreBoardRow.value);

  // 新規追加モードのとき
  if (props.isAdd) {
    authAxiosInstance
      .post("/gameresults", gameResult.value)
      .then((response) => {
        window.alert("試合結果が保存されました:");
        router.push({
          name: "gameresult",
          params: {
            team: gameResult.value.team_id,
            gameResultId: response.data.id,
          },
        });
        isEditting.value = false;
      })
      .catch((error) => {
        window.alert("試合結果の保存に失敗しました:" + error);
      });

    // 新規追加モードでなく、編集が完了（isEditがfalseになったとき）
  } else if (!newValue) {
    authAxiosInstance
      .put(`/gameresults/${gameResult.value.id}`, gameResult.value)
      .then((response) => {
        window.alert("試合結果が更新されました:");
      })
      .catch((error) => {
        window.alert("試合結果の更新に失敗しました:" + error);
      });
  }
}
</script>
