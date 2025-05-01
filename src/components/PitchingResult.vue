<template>
  <div class="q-pa-md">
    <h2 class="text-h5 q-mb-md">投手成績</h2>

    <!-- 投手成績表 -->
    <q-table
      :rows="pitchingresultModel"
      :columns="columns"
      row-key="player_id"
      table-header-class="{vertical-header-table:true}"
      hide-pagination
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-center"
            :style="headerStyle(col.name)"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          :style="{
            backgroundColor: props.rowIndex % 2 === 0 ? '#f0f8ff' : '#ffffff',
          }"
        >
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :style="getCellStyle(col.name, props.row)"
          >
            <EditShowComponent v-model="props.row[col.name]" :isEdit="isEdit" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- 投手追加ボタン (編集モード時のみ表示) -->
    <div v-if="isEdit" class="q-mt-md">
      <q-btn
        icon="add"
        label="投手を追加"
        color="primary"
        @click="addPitcher"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditShowComponent from "@/components/EditShowComponent.vue";
import type { PitchingResultClass } from "@/adapters/adapter";

// Propsで外部から初期データを受け取る
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const pitchingresultModel = defineModel<PitchingResultClass[]>(
  "pitchingresultModel",
  { default: [] }
);

// カラム定義
const columns = [
  {
    name: "player_number",
    label: "背番号",
    field: "player_number",
    align: "center",
    headerClasses: "vertical-header-table",
  },
  { name: "player_name", label: "選手名", field: "player_name", align: "left" },
  { name: "innings", label: "投球回", field: "innings", align: "center" },
  { name: "pitchs", label: "投球数", field: "pitchs", align: "center" },
  { name: "batters", label: "打者", field: "batters", align: "center" },
  { name: "hits", label: "被安打", field: "hits", align: "center" },
  { name: "homeruns", label: "被本塁打", field: "homeruns", align: "center" },
  { name: "strikeouts", label: "奪三振", field: "strikeouts", align: "center" },
  { name: "walks", label: "与四球", field: "walks", align: "center" },
  {
    name: "hit_by_pitch",
    label: "与死球",
    field: "hit_by_pitch",
    align: "center",
  },
  { name: "balks", label: "ボーク", field: "balks", align: "center" },
  { name: "runs", label: "失点", field: "runs", align: "center" },
  {
    name: "earned_runs",
    label: "自責点",
    field: "earned_runs",
    align: "center",
  },
  { name: "result", label: "結果", field: "result", align: "center" },
  {
    name: "pitching_order",
    label: "登板順",
    field: "pitching_order",
    align: "center",
  },
];

// メソッド
const toggleEditMode = () => {
  isEdit.value = !isEdit.value;
};

const saveChanges = () => {
  // データを保存する処理を実装
  // 例: API呼び出しや親コンポーネントに通知するなど
  console.log("保存されたデータ:", rows.value);

  // 保存完了の通知
  isEdit.value = false;
};

const addPitcher = () => {
  // 新しい投手を追加
  const newId = Math.max(...rows.value.map((r) => r.player_id), 0) + 1;
  rows.value.push({
    player_number: "",
    player_name: "",
    innings: 0,
    pitchs: 0,
    batters: 0,
    hits: 0,
    homeruns: 0,
    strikeouts: 0,
    walks: 0,
    hit_by_pitch: 0,
    balks: 0,
    runs: 0,
    earned_runs: 0,
    result: "",
    pitching_order: 0,
    player_id: newId,
  });
};

const headerStyle = (colName: string) => {
  return "background-color: #e0f7ff;";
};

const getCellStyle = (colName: string, row: any) => {
  return "";
};
</script>

<style scoped>
.pitching-stats-table {
  font-family: Arial, sans-serif;
}

.edit-cell {
  width: 100%;
  min-width: 60px;
}
</style>
