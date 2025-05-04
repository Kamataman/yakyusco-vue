<template>
  <q-table
    flat
    bordered
    square
    :rows="rowRef"
    :columns="columns"
    row-key="team"
    class="scoreboard-table"
    hide-bottom
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <template v-if="isEdit && /^inning\d+$/.test(col.name)">
            <q-input
              v-model="rows[props.rowIndex][col.name]"
              :input-style="{ color: 'white' }"
              type="number"
              min="0"
              max="99"
              dense
            />
          </template>
          <template v-else> {{ props.row[col.name] }}</template>
        </q-td></q-tr
      ></template
    ></q-table
  >
</template>

<script setup lang="ts">
import type { ScoreBoardRow } from "@/adapters/adapter";
import { ref, computed } from "vue";

// propsで外部からデータを受け取る
const rows = defineModel<ScoreBoardRow[]>("rows", { default: () => [] });
const rowRef = ref(rows);
const props = defineProps({
  isEdit: Boolean,
  innings: Number,
});

// columnsを動的に生成
const columns = computed<
  {
    name: string;
    label: string;
    field: string;
    align: "left" | "center" | "right" | undefined;
  }[]
>(() => [
  {
    name: "team",
    label: "チーム",
    field: "team",
    align: "left",
  },
  ...Array.from({ length: props.innings }, (_, i) => ({
    name: `inning${i + 1}`,
    label: `${i + 1}`,
    field: `inning${i + 1}`,
    align: "center" as "center",
  })),
  {
    name: "total",
    label: "計",
    field: "total",
    align: "center",
  },
]);
</script>

<style scoped>
.scoreboard-table {
  background-color: #1c1c1c;
  border: 2px solid #ffffff;
  font-family: "Courier New", monospace;
  color: #ffffff !important;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  overflow-x: auto;
}
.scoreboard-table .q-table__container {
  color: #ffffff;
}
.q-field__native {
  color: #ffffff;
}
.scoreboard-table td,
.scoreboard-table th {
  border: 1px solid #ffffff !important;
  color: #ffffff !important;
  background-color: #1c1c1c !important;
  text-align: center;
}
</style>
