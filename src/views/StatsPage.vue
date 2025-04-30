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

const battingRows: QTableProps["rows"] = [
  {
    no: 17,
    name: "Ohtani",
    avg: 0.313,
    games: 5,
    pa: 20,
    ab: 17,
    hits: 8,
  },
  {
    no: 1,
    name: "Herunandesu",
    avg: 0.253,
    games: 5,
    pa: 18,
    ab: 16,
    hits: 5,
  },
  {
    no: 4,
    name: "Sekando",
    avg: 0.23,
    games: 4,
    pa: 11,
    ab: 9,
    hits: 4,
  },
  {
    no: 6,
    name: "Sho-to",
    avg: 0.27,
    games: 4,
    pa: 15,
    ab: 8,
    hits: 3,
  },
];
const pitchingColumns: QTableProps["columns"] = [
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
  { name: "era", label: "防御率", field: "era", sortable: true },
  { name: "games", label: "登板", field: "games", sortable: true },
  { name: "starts", label: "先発", field: "starts", sortable: true },
  { name: "wins", label: "勝利", field: "wins", sortable: true },
  { name: "loses", label: "敗戦", field: "loses", sortable: true },
];

const pitchingRows: QTableProps["rows"] = [
  {
    no: 17,
    name: "Ohtani",
    era: 2.33,
    games: 24,
    starts: 24,
    wins: 14,
    loses: 4,
  },
  {
    no: 1,
    name: "Pittya-",
    era: 3.67,
    games: 26,
    starts: 6,
    wins: 15,
    loses: 12,
  },
  {
    no: 11,
    name: "投太郎",
    era: 6.44,
    games: 64,
    starts: 0,
    wins: 5,
    loses: 6,
  },
  {
    no: 22,
    name: "Daimajin",
    era: 1.67,
    games: 54,
    starts: 0,
    wins: 3,
    loses: 2,
  },
  {
    no: 33,
    name: "酷使君",
    era: 4.33,
    games: 73,
    starts: 7,
    wins: 4,
    loses: 8,
  },
  {
    no: 50,
    name: "Wakate",
    era: 10.34,
    games: 4,
    starts: 2,
    wins: 0,
    loses: 2,
  },
  {
    no: 67,
    name: "Wakate2",
    era: 6.33,
    games: 15,
    starts: 7,
    wins: 2,
    loses: 7,
  },
];
</script>
