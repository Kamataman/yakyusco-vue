<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 q-pa-xs">
        <template v-if="isFf">vs {{ bfTeamName }}</template>
        <template v-else>vs {{ ffTeamName }}</template>
      </div>
    </q-card-section>
    <q-card-section horizontal>
      <q-card-section>
        <div class="q-pa-sm">
          <!-- 先攻後攻 -->
          <template v-if="isEdit">
            <q-select
              v-model="isFf"
              :options="[
                { label: '先攻', value: false },
                { label: '後攻', value: true },
              ]"
              label="先攻後攻"
              dense
              emit-value
              map-options
            />
          </template>
          <template v-else>
            <!-- 何も表示しない -->
          </template>
          <!-- 勝敗 -->
          <template v-if="isEdit">
            <q-select
              v-model="winLose"
              :options="[
                { label: '勝利', value: 'W' },
                { label: '敗北', value: 'L' },
                { label: '引分', value: 'D' },
              ]"
              label="勝敗"
              dense
              emit-value
              map-options
            />
          </template>
          <template v-else>
            <div :style="getWinLoseColorStyle(winLose)">
              {{ winLoseExpression }}
            </div>
          </template>
          <div>
            イニング数：<EditShowComponent
              :isEdit="isEdit"
              v-model="innings"
            ></EditShowComponent>
          </div>
          <div>
            日時：
            <template v-if="isEdit">
              <VueDatePicker
                v-model="date"
                format="yyyy/MM/dd HH:mm"
                model-type="iso"
                auto-apply
                week-start="0"
                time-picker-inline
              />
            </template>
            <template v-else>
              {{
                date?.toLocaleString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}</template
            >
          </div>
          <div>
            場所：<EditShowComponent
              :isEdit="isEdit"
              v-model="place"
            ></EditShowComponent>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <ScoreBoard
          v-model:rows="scoreBoardRow"
          :innings="innings"
          :isEdit="isEdit"
        />
      </q-card-section>
    </q-card-section>
    <q-card-section>
      <EditShowComponent :isEdit="isEdit" v-model="review"></EditShowComponent>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { ScoreBoardRow } from "@/adapters/adapter";
import ScoreBoard from "@/components/ScoreBoard.vue";
import EditShowComponent from "./EditShowComponent.vue";

import { computed } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineProps<{
  isEdit: boolean;
  //   winLose: string;
  //   isFf: boolean;
  //   ffTeamName: string;
  //   bfTeamName: string;
  // date: string;
  // place: string;
  //   innings: number;
  // review?: string;
}>();

const winLose = defineModel<string>("winLose");
const isFf = defineModel<boolean>("isFf");
const ffTeamName = defineModel<string>("ffTeamName");
const bfTeamName = defineModel<string>("bfTeamName");
const date = defineModel<Date>("date");
const place = defineModel<string>("place");
const innings = defineModel<number>("innings", { default: 1 });
const review = defineModel<string | undefined>("review");
const scoreBoardRow = defineModel<ScoreBoardRow[]>("scoreBoardRow");

const winLoseExpression = computed(() => {
  switch (winLose.value) {
    case "W":
      return "勝利！！";
    case "L":
      return "敗北．．．";
    case "D":
      return "引き分け";
    default:
      return "aa";
  }
});

function getWinLoseColorStyle(winLose: string | undefined) {
  switch (winLose) {
    case "W":
      return "color : red";
    case "L":
      return "color : blue";
    default:
      return "";
  }
}
</script>
