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
    name: "no",
    required: true,
    label: "＃",
    align: "left",
    field: "no",
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
];

const pitchingColumns: QTableProps["columns"] = [
  {
    name: "number",
    required: true,
    label: "＃",
    align: "left",
    field: "no",
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
