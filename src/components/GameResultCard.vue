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
          <div v-if="winLose == 'W'" style="color: red">
            {{ getWinLoseExpression(winLose) }}
          </div>
          <div v-else-if="winLose == 'L'" style="color: blue">
            {{ getWinLoseExpression(winLose) }}
          </div>
          <div v-else>
            {{ getWinLoseExpression(winLose) }}
          </div>
          <div>
            日時：<EditShowComponent
              :isEdit="isEdit"
              v-model="date"
            ></EditShowComponent>
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
        <ScoreBoard :rows="scoreBoardRow" :innings="innings" />
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

import { getWinLoseExpression } from "@/adapters/adapter";

defineProps<{
  isEdit: boolean;
  //   winLose: string;
  //   isFf: boolean;
  //   ffTeamName: string;
  //   bfTeamName: string;
  date: string;
  place: string;
  //   innings: number;
  review?: string;
  scoreBoardRow: ScoreBoardRow[];
}>();

const winLose = defineModel<string>("winLose");
const isFf = defineModel<boolean>("isFf");
const ffTeamName = defineModel<string>("ffTeamName");
const bfTeamName = defineModel<string>("bfTeamName");
const date = defineModel<string>("date");
const place = defineModel<string>("place");
const innings = defineModel<number>("innings");
const review = defineModel<string | undefined>("review");
const scoreBoardRow = defineModel<ScoreBoardRow[]>("scoreBoardRow");
</script>
