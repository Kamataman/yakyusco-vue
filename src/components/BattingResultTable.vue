<template>
  <!-- 打撃成績表 -->
  <q-table
    :rows="battingResultModel"
    :columns="columns"
    row-key="player_id"
    class="baseball-stats-table"
    hide-pagination
    rowsPerPage="0"
    :rows-per-page-options="[0]"
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
          <template v-if="col.name === 'atbat_results'">
            <!-- 編集モードのときのみ打席結果のカラムを表示する -->
            <template v-if="isEdit">
              {{ col.label }}
            </template>
            <template v-else></template>
          </template>
          <template v-else-if="/^\d+$/.test(col.name)">
            <!-- 編集モードでないときのみ打席結果のカラムを表示する -->
            <template v-if="!isEdit">
              {{ col.label }}
            </template>
            <template v-else></template>
          </template>
          <template v-else>
            {{ col.label }}
          </template>
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
          <!-- 打席結果のセル -->
          <template v-else-if="col.name === 'atbat_results'">
            <template v-if="isEdit">
              <InputAtbatResult v-model:atbatResults="props.row[col.name]" />
            </template>
          </template>
          <!-- 打点のセル -->
          <template v-else-if="col.name === 'rbi'">
            <EditShowComponent v-model="props.row[col.name]" :isEdit="isEdit" />
          </template>
          <!-- 得点のセル -->
          <template v-else-if="col.name === 'runs'">
            <EditShowComponent v-model="props.row[col.name]" :isEdit="isEdit" />
          </template>
          <!-- 盗塁のセル -->
          <template v-else-if="col.name === 'steels'">
            <EditShowComponent v-model="props.row[col.name]" :isEdit="isEdit" />
          </template>
          <!-- イニングのセル -->
          <template v-else-if="/^\d+$/.test(col.name)">
            <template v-if="!isEdit">
              <template
                v-for="atbatInInning in props.row['atbat_results'].filter((x:AtbatResultClass)=>x.inning===parseInt(col.name))"
              >
                <ShowAtbatResult :atbatResult="atbatInInning"></ShowAtbatResult
              ></template>
            </template>
          </template>
          <!-- <template v-else>
            <EditShowComponent v-model="props.row[col.name]" :isEdit="isEdit" />
          </template> -->
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
import InputAtbatResult from "@/components/InputAtbatResults.vue";
import SelectPositions from "@/components/SelectPositions.vue";
import ShowAtbatResult from "@/components/ShowAtbatResult.vue";
import { AtbatResultClass, BattingResultClass } from "@/adapters/adapter";
import { computed } from "vue";

const props = defineProps<{
  isEdit: boolean;
  innings: number;
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
}[] = computed(() => {
  const baseColumns = [
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
    {
      name: "atbat_results",
      label: "打席結果",
      field: "atbat_results",
      align: "left",
    },
  ];
  // イニングごとのカラムを追加
  const inningColumns = Array.from({ length: props.innings }, (_, i) => ({
    name: `${i + 1}`,
    label: `${i + 1}回`,
    field: `inning${i + 1}`,
    align: "center",
  }));

  return [...baseColumns, ...inningColumns];
});

// const displayRows = computed(() => rows.value);

// function toggleEditMode() {
//   isEdit.value = !isEdit.value;
// }

// function saveChanges() {
//   emit("data-saved", rows.value);
//   isEdit.value = false;
// }

function addPlayer() {
  battingResultModel.value.push(new BattingResultClass());
}

function headerStyle(colName: string): string {
  if (["position", "number", "name"].includes(colName)) {
    return "background-color: #e0f7ff;";
  }
  return "background-color: #e0f7ff;";
}

function getCellStyle(colName: string): string {
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
