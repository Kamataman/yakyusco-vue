<template>
  <BaseLayout
    ><template #title>個人成績一覧</template>
    <template #default>
      <div class="q-pa-md">
        <q-table
          flat
          bordered
          title="野手成績"
          dense
          :rows="battingRows"
          :columns="battingColumns"
          row-key="no"
          hide-bottom
          separator="cell"
        />
      </div>
      <div class="q-pa-md">
        <q-table
          flat
          bordered
          title="投手成績"
          dense
          :rows="pitchingRows"
          :columns="pitchingColumns"
          row-key="no"
          hide-bottom
          separator="cell"
        />
      </div> </template
  ></BaseLayout>
</template>

<script setup lang="ts">
import type { QTableProps } from "quasar";

import BaseLayout from "@/components/BaseLayout.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { axiosInstance } from "@/plugins/axios";

const battingColumns: QTableProps["columns"] = [
  {
    name: "number",
    required: true,
    label: "＃",
    align: "left",
    field: "number",
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "名前",
    field: "name",
    sortable: true,
  },
  { name: "avg", label: "打率", field: "avg", sortable: true },
  { name: "games", label: "試合", field: "games", sortable: true },
  { name: "pa", label: "打席", field: "pa", sortable: true },
  { name: "ab", label: "打数", field: "ab", sortable: true },
  { name: "hits", label: "安打", field: "hits", sortable: true },
  { name: "dh", label: "二塁打", field: "dh", sortable: true },
  { name: "th", label: "三塁打", field: "th", sortable: true },
  { name: "hr", label: "本塁打", field: "hr", sortable: true },
  { name: "rh", label: "走本塁打", field: "rh", sortable: true },
  { name: "bases", label: "塁打", field: "bases", sortable: true },
  { name: "rbi", label: "打点", field: "rbi", sortable: true },
  { name: "runs", label: "得点", field: "runs", sortable: true },
  { name: "ko", label: "三振", field: "ko", sortable: true },
  { name: "bb", label: "四球", field: "bb", sortable: true },
  { name: "hbp", label: "死球", field: "hbp", sortable: true },
  { name: "sb", label: "犠打", field: "sb", sortable: true },
  { name: "sf", label: "犠飛", field: "sf", sortable: true },
  { name: "steels", label: "盗塁", field: "steels", sortable: true },
  { name: "dp", label: "併殺打", field: "dp", sortable: true },
  { name: "obp", label: "出塁率", field: "obp", sortable: true },
  { name: "slg", label: "長打率", field: "slg", sortable: true },
  { name: "ops", label: "ＯＰＳ", field: "ops", sortable: true },
  { name: "scpos_avg", label: "得点圏", field: "scpos_avg", sortable: true },
];

const pitchingColumns: QTableProps["columns"] = [
  {
    name: "number",
    required: true,
    label: "＃",
    align: "left",
    field: "number",
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "名前",
    field: "name",
    sortable: true,
  },
  { name: "era", label: "防御率", field: "era", sortable: true },
  { name: "games", label: "登板", field: "games", sortable: true },
  { name: "starts", label: "先発", field: "starts", sortable: true },
  { name: "wins", label: "勝利", field: "wins", sortable: true },
  { name: "loses", label: "敗戦", field: "loses", sortable: true },
  { name: "holds", label: "ホールド", field: "holds", sortable: true },
  { name: "saves", label: "セーブ", field: "saves", sortable: true },
  { name: "win_pct", label: "勝率", field: "win_pct", sortable: true },
  { name: "innings", label: "投球回", field: "innings", sortable: true },
  { name: "pitchs", label: "投球数", field: "pitchs", sortable: true },
  { name: "batters", label: "打者", field: "batters", sortable: true },
  { name: "hits", label: "被安打", field: "hits", sortable: true },
  { name: "hr", label: "被本塁打", field: "hr", sortable: true },
  { name: "ko", label: "奪三振", field: "ko", sortable: true },
  { name: "ko_pct", label: "奪三振率", field: "ko_pct", sortable: true },
  { name: "bb", label: "与四球", field: "bb", sortable: true },
  {
    name: "hbp",
    label: "与死球",
    field: "hbp",
    sortable: true,
  },
  { name: "balks", label: "ボーク", field: "balks", sortable: true },
  { name: "runs", label: "失点", field: "runs", sortable: true },
  {
    name: "earned_runs",
    label: "自責点",
    field: "earned_runs",
    sortable: true,
  },
  { name: "oav", label: "被打率", field: "oav", sortable: true },
  { name: "k_bb", label: "Ｋ／ＢＢ", field: "k_bb", sortable: true },
  { name: "whip", label: "ＷＨＩＰ", field: "whip", sortable: true },
];

const battingRows = ref([]);
const pitchingRows = ref([]);

onMounted(async () => {
  const route = useRoute(); // 現在のルート情報を取得
  const teamId = route.params.team as string; // URLのパラメータからteamを取得

  try {
    const battingResponse = await axiosInstance.get(
      `/teams/${teamId}/stats/batting`
    );
    const pitchingResponse = await axiosInstance.get(
      `/teams/${teamId}/stats/pitching`
    );
    battingRows.value = battingResponse.data;
    pitchingRows.value = pitchingResponse.data;
  } catch (error) {
    console.error("選手データの取得に失敗しました:", error);
  }
});
</script>
