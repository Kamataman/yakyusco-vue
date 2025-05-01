<template>
  <!-- 打撃成績表 -->
  <q-table
    :rows="battingResultModel"
    :columns="columns"
    row-key="player_id"
    class="baseball-stats-table"
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
          <!-- 選手のセル -->
          <template v-if="col.name === 'player_id'">
            <SelectPlayer
              v-model:playerId="props.row[col.name]"
              :is-edit="isEdit"
            />
          </template>
          <!-- 守備位置のセル -->
          <template v-else-if="col.name === 'position'">
            <SelectPositions
              v-model:positions="props.row[col.name]"
              :is-edit="isEdit"
            />
          </template>
          <!-- その他のセル -->
          <template v-else>
            <EditShowComponent v-model="props.row[col.name]" :isEdit="isEdit" />
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <!-- 選手追加ボタン (編集モード時のみ表示) -->
  <div v-if="isEdit" class="q-mt-md">
    <q-btn icon="add" label="選手を追加" color="primary" @click="addPlayer" />
  </div>

  <div class="legend q-mt-sm">
    <span>(): 先発</span>
    <span class="q-ml-md">赤文字: 安打</span>
    <span class="q-ml-md">黄背景: 得点圏</span>
  </div>
</template>

<script setup lang="ts">
import EditShowComponent from "@/components/EditShowComponent.vue";
import SelectPlayer from "@/components/SelectPlayer.vue";
import SelectPositions from "./SelectPositions.vue";
import type { BattingResultClass } from "@/adapters/adapter";
import { ref, onMounted } from "vue";

defineProps<{
  isEdit: boolean;
}>();

const battingResultModel = defineModel<BattingResultClass[]>(
  "battingResultModel",
  {
    default: [],
  }
);

// const emit = defineEmits<{
//   (e: "data-saved", rows: Row[]): void;
// }>();

// // const isEdit = ref(false);
// const rows = ref<Row[]>(
//   props.initialData.length > 0
//     ? JSON.parse(JSON.stringify(props.initialData))
//     : getDefaultData()
// );

const columns: {
  name: string;
  label: string;
  field: string;
  align: "center" | "left" | "right" | undefined;
  headerClasses?: string;
}[] = [
  {
    name: "player_id",
    label: "選手",
    field: "player",
    align: "center",
    headerClasses: "vertical-header-table",
  },
  { name: "position", label: "位置", field: "position", align: "center" },
  { name: "rbi", label: "打点", field: "rbi", align: "center" },
  { name: "runs", label: "得点", field: "runs", align: "center" },
  { name: "steels", label: "盗塁", field: "steels", align: "center" },
  { name: "inning1", label: "1回", field: "inning1", align: "center" },
  { name: "inning2", label: "2回", field: "inning2", align: "center" },
  { name: "inning3", label: "3回", field: "inning3", align: "center" },
  { name: "inning4", label: "4回", field: "inning4", align: "center" },
  { name: "inning5", label: "5回", field: "inning5", align: "center" },
  { name: "inning6", label: "6回", field: "inning6", align: "center" },
  { name: "inning7", label: "7回", field: "inning7", align: "center" },
  { name: "inning8", label: "8回", field: "inning8", align: "center" },
];

const battingResultOptions = ref<string[]>([
  "空三振",
  "見三振",
  "二ゴロ",
  "遊ゴロ",
  "三ゴロ",
  "一ゴロ",
  "投ゴロ",
  "捕ゴロ",
  "中安",
  "左安",
  "右安",
  "左2",
  "中2",
  "右2",
  "三飛",
  "遊飛",
  "二飛",
  "一飛",
  "右飛",
  "中飛",
  "左飛",
  "四球",
  "死球",
  "犠打",
  "犠飛",
  "投飛打",
  "失策",
]);

// const displayRows = computed(() => rows.value);

// function toggleEditMode() {
//   isEdit.value = !isEdit.value;
// }

// function saveChanges() {
//   emit("data-saved", rows.value);
//   isEdit.value = false;
// }

function addPlayer() {
  battingResultModel.value.push({
    player_id: undefined,
    position: [],
    rbi: 0,
    runs: 0,
    steels: 0,
    inning1: "",
    inning2: "",
    inning3: "",
    inning4: "",
    inning5: "",
    inning6: "",
    inning7: "",
    inning8: "",
  });
}

function headerStyle(colName: string): string {
  if (["position", "number", "name"].includes(colName)) {
    return "background-color: #e0f7ff;";
  }
  return "background-color: #e0f7ff;";
}

function getCellStyle(colName: string, row: Row): string {
  if (colName === "position") {
    return "width: 50px; color: #964B00;";
  }
  if (colName === "number") {
    return "width: 40px;";
  }
  if (colName === "name") {
    return "width: 80px;";
  }
  return "";
}

function getCellClass(value: string): string {
  if (!value) return "";
  if (value.includes("安")) {
    return "hit-cell";
  }
  if (value === "中安") {
    return "scoring-position-cell";
  }
  return "";
}

function getDefaultData(): Row[] {
  return [
    {
      id: 1,
      position: "(右)",
      number: "1",
      name: "選手A",
      hits: "0",
      runs: "1",
      bases: "1",
      inning1: "中安",
      inning2: "空三振",
      inning4: "見三振",
      inning6: "遊ゴロ",
    },
    // 他のデフォルトデータ...
  ];
}
</script>

<style scoped>
.baseball-stats-table {
  font-family: Arial, sans-serif;
}

.position-cell {
  color: #964b00;
}

.hit-cell {
  color: red;
}

.scoring-position-cell {
  background-color: #ffffaa;
}

.legend {
  font-size: 0.8rem;
  margin-top: 10px;
  color: #666;
}

.edit-cell {
  width: 100%;
  min-width: 60px;
}

.position-input input {
  color: #964b00;
}

.batting-results-dropdown {
  max-height: 300px;
}
</style>
