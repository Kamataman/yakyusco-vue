<template>
  <div class="q-pa-md">
    <h2 class="text-h5 q-mb-md">打撃成績</h2>

    <!-- 打撃成績表 -->
    <q-table
      flat
      :rows="displayRows"
      :columns="columns"
      row-key="id"
      class="baseball-stats-table"
      :pagination="{ rowsPerPage: 0 }"
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
            <!-- 編集モードの場合 -->
            <template v-if="isEdit">
              <template
                v-if="
                  [
                    'position',
                    'number',
                    'name',
                    'hits',
                    'runs',
                    'bases',
                  ].includes(col.name)
                "
              >
                <q-input
                  v-model="props.row[col.name]"
                  dense
                  borderless
                  class="edit-cell"
                  :class="{ 'position-input': col.name === 'position' }"
                />
              </template>

              <template v-else-if="col.name.startsWith('inning')">
                <q-select
                  v-model="props.row[col.name]"
                  dense
                  borderless
                  :options="battingResultOptions"
                  class="edit-cell"
                  popup-content-class="batting-results-dropdown"
                  clearable
                >
                  <template v-slot:selected>
                    <div :class="getCellClass(props.row[col.name])">
                      {{ props.row[col.name] || "" }}
                    </div>
                  </template>
                </q-select>
              </template>
            </template>

            <!-- 表示モードの場合 -->
            <template v-else>
              <div v-if="col.name === 'position'" class="position-cell">
                {{ props.row[col.name] }}
              </div>
              <div
                v-else-if="col.name.startsWith('inning') && props.row[col.name]"
                :class="getCellClass(props.row[col.name])"
              >
                {{ props.row[col.name] }}
              </div>
              <div v-else>{{ props.row[col.name] }}</div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Row {
  id: number;
  position: string;
  number: string;
  name: string;
  hits: string;
  runs: string;
  bases: string;
  [key: string]: string | number;
}

interface Column {
  name: string;
  label: string;
  field: string;
  align: "left" | "right" | "center" | undefined;
}

const props = defineProps<{
  initialData: Row[];
  isEdit: boolean;
}>();

const emit = defineEmits<{
  (e: "data-saved", rows: Row[]): void;
}>();

// const isEdit = ref(false);
const rows = ref<Row[]>(
  props.initialData.length > 0
    ? JSON.parse(JSON.stringify(props.initialData))
    : getDefaultData()
);
const columns = ref<Column[]>([
  { name: "position", label: "位置", field: "position", align: "center" },
  { name: "number", label: "#", field: "number", align: "center" },
  { name: "name", label: "選手名", field: "name", align: "left" },
  { name: "hits", label: "打点", field: "hits", align: "center" },
  { name: "runs", label: "得点", field: "runs", align: "center" },
  { name: "bases", label: "盗塁", field: "bases", align: "center" },
  { name: "inning1", label: "1回", field: "inning1", align: "center" },
  { name: "inning2", label: "2回", field: "inning2", align: "center" },
  { name: "inning3", label: "3回", field: "inning3", align: "center" },
  { name: "inning4", label: "4回", field: "inning4", align: "center" },
  { name: "inning5", label: "5回", field: "inning5", align: "center" },
  { name: "inning6", label: "6回", field: "inning6", align: "center" },
  { name: "inning7", label: "7回", field: "inning7", align: "center" },
  { name: "inning8", label: "8回", field: "inning8", align: "center" },
]);

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

const displayRows = computed(() => rows.value);

function toggleEditMode() {
  isEdit.value = !isEdit.value;
}

function saveChanges() {
  emit("data-saved", rows.value);
  isEdit.value = false;
}

function addPlayer() {
  const newId = Math.max(...rows.value.map((r) => r.id), 0) + 1;
  rows.value.push({
    id: newId,
    position: "",
    number: "",
    name: "",
    hits: "0",
    runs: "0",
    bases: "0",
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
