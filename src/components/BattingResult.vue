<template>
  <div class="q-pa-md">
    <h2 class="text-h5 q-mb-md">打撃成績</h2>

    <!-- 編集モード切り替えボタン -->
    <div class="q-mb-md">
      <q-btn
        :color="isEditing ? 'negative' : 'primary'"
        :label="isEditing ? '編集を終了' : '編集モード'"
        @click="toggleEditMode"
        class="q-mr-md"
      />
      <q-btn
        v-if="isEditing"
        color="positive"
        label="保存"
        @click="saveChanges"
      />
    </div>

    <!-- 打撃成績表 -->
    <q-table
      flat
      :rows="displayRows"
      :columns="columns"
      row-key="id"
      class="baseball-stats-table"
      :pagination="{ rowsPerPage: 0 }"
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
            <template v-if="isEditing">
              <!-- 位置、番号、選手名、打点、得点、盗塁カラム -->
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

              <!-- イニングごとの結果カラム -->
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
    <div v-if="isEditing" class="q-mt-md">
      <q-btn icon="add" label="選手を追加" color="primary" @click="addPlayer" />
    </div>

    <div class="legend q-mt-sm">
      <span>(): 先発</span>
      <span class="q-ml-md">赤文字: 安打</span>
      <span class="q-ml-md">黄背景: 得点圏</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseballStatsTable",
  props: {
    // 外部から初期データを受け取れるようにする
    initialData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isEditing: false,
      columns: [
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
      ],
      rows: [],
      battingResultOptions: [
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
      ],
    };
  },
  computed: {
    displayRows() {
      return this.rows;
    },
  },
  created() {
    // 初期データがあればそれを使い、なければデフォルトデータを使用
    if (this.initialData && this.initialData.length > 0) {
      this.rows = JSON.parse(JSON.stringify(this.initialData));
    } else {
      this.rows = this.getDefaultData();
    }
  },
  methods: {
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
    saveChanges() {
      // ここでデータを保存する処理を実装
      // 例: API呼び出しや親コンポーネントに通知するなど
      this.$emit("data-saved", this.rows);

      // 保存完了のメッセージなどを表示する
      this.$q.notify({
        message: "打撃成績を保存しました",
        color: "positive",
        icon: "save",
      });

      // 編集モードを終了
      this.isEditing = false;
    },
    addPlayer() {
      // 新しい選手を追加
      const newId = Math.max(...this.rows.map((r) => r.id), 0) + 1;
      this.rows.push({
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
    },
    headerStyle(colName) {
      if (
        colName === "position" ||
        colName === "number" ||
        colName === "name"
      ) {
        return "background-color: #e0f7ff;";
      }
      return "background-color: #e0f7ff;";
    },
    getCellStyle(colName, row) {
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
    },
    getCellClass(value) {
      if (!value) return "";

      // 安打の場合は赤文字
      if (value.includes("安")) {
        return "hit-cell";
      }
      // 得点圏の場合は黄色背景
      if (value === "中安") {
        return "scoring-position-cell";
      }
      return "";
    },
    getDefaultData() {
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
        {
          id: 2,
          position: "(中)",
          number: "2",
          name: "選手B",
          hits: "0",
          runs: "0",
          bases: "0",
          inning1: "二飛",
          inning3: "投飛打",
          inning6: "空三振",
        },
        {
          id: 3,
          position: "左",
          number: "11",
          name: "選手K",
          hits: "0",
          runs: "0",
          bases: "0",
        },
        {
          id: 4,
          position: "(左)",
          number: "3",
          name: "選手C",
          hits: "0",
          runs: "2",
          bases: "0",
          inning1: "二ゴロ",
          inning3: "四球",
          inning8: "左2",
        },
        {
          id: 5,
          position: "打",
          number: "12",
          name: "選手L",
          hits: "0",
          runs: "0",
          bases: "0",
        },
        {
          id: 6,
          position: "走",
          number: "13",
          name: "選手M",
          hits: "0",
          runs: "0",
          bases: "0",
        },
        {
          id: 7,
          position: "(指)",
          number: "4",
          name: "選手D",
          hits: "0",
          runs: "1",
          bases: "0",
          inning4: "左飛",
          inning6: "三失",
          inning8: "二ゴロ",
        },
        {
          id: 8,
          position: "(一)",
          number: "5",
          name: "選手E",
          hits: "1",
          runs: "0",
          bases: "0",
          inning1: "左安",
          inning4: "中飛",
          inning6: "遊ゴロ",
        },
        {
          id: 9,
          position: "(二)",
          number: "6",
          name: "選手F",
          hits: "2",
          runs: "0",
          bases: "1",
          inning1: "右安",
          inning4: "一飛",
          inning8: "中安",
        },
        {
          id: 10,
          position: "(捕)",
          number: "7",
          name: "選手G",
          hits: "1",
          runs: "0",
          bases: "0",
          inning1: "四球",
          inning6: "四球",
          inning8: "左安",
        },
        {
          id: 11,
          position: "中",
          number: "14",
          name: "選手N",
          hits: "0",
          runs: "0",
          bases: "0",
        },
        {
          id: 12,
          position: "(三)",
          number: "8",
          name: "選手H",
          hits: "0",
          runs: "0",
          bases: "0",
          inning5: "遊飛",
          inning6: "遊ゴロ",
          inning8: "三ゴロ",
        },
        {
          id: 13,
          position: "(遊)",
          number: "9",
          name: "選手I",
          hits: "0",
          runs: "0",
          bases: "0",
          inning3: "見三振",
        },
        {
          id: 14,
          position: "投",
          number: "15",
          name: "選手O",
          hits: "0",
          runs: "0",
          bases: "0",
        },
        {
          id: 15,
          position: "(投)",
          number: "10",
          name: "選手J",
          hits: "0",
          runs: "0",
          bases: "0",
          inning5: "遊ゴロ",
          inning6: "見三振",
          inning8: "中安",
        },
      ];
    },
  },
};
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
