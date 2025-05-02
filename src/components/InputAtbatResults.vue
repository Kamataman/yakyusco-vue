<template>
  <div class="row">
    <q-card v-for="(atbatResult, index) in atbatResults">
      <div class="row">
        <q-input
          v-model.number="atbatResult.inning"
          type="number"
          label="イニング"
          :min="1"
          :max="15"
          dense
        />
        <q-checkbox v-model="atbatResult.is_scpos" label="得点圏" size="xs" />
      </div>
      <div class="row">
        <q-select
          v-model="atbatResult.result"
          :options="[
            { label: '空振り三振', value: 'KO' },
            { label: '見逃し三振', value: 'MK' },
            { label: '振り逃げ', value: 'DT' },
            { label: '四球', value: 'BB' },
            { label: '故意四球', value: 'IB' },
            { label: '死球', value: 'HP' },
            { label: 'ゴロアウト', value: 'GO' },
            { label: 'フライアウト', value: 'FO' },
            { label: 'ファールフライアウト', value: 'FF' },
            { label: 'ライナーアウト', value: 'LO' },
            { label: 'エラー', value: 'MP' },
            { label: 'シングルヒット', value: 'SH' },
            { label: 'ツーベースヒット', value: 'DH' },
            { label: 'スリーベースヒット', value: 'TH' },
            { label: 'ホームラン', value: 'HR' },
            { label: 'ランニングホームラン', value: 'RH' },
            { label: '犠牲バント', value: 'SB' },
            { label: '犠牲フライ', value: 'SF' },
            { label: '併殺打', value: 'DP' },
            { label: 'フィルダースチョイス', value: 'FC' },
            { label: '打撃妨害', value: 'BI' },
            { label: '守備妨害', value: 'RI' },
          ]"
          dense
          label="結果"
          emit-value
          map-options
        />
        <q-select
          v-model="atbatResult.position"
          :options="[
            { label: '投　', value: 1 },
            { label: '捕　', value: 2 },
            { label: '一　', value: 3 },
            { label: '二　', value: 4 },
            { label: '三　', value: 5 },
            { label: '遊　', value: 6 },
            { label: '左　', value: 7 },
            { label: '中　', value: 8 },
            { label: '右　', value: 9 },
          ]"
          dense
          label="方向"
          emit-value
          map-options
        />
      </div>
      <q-btn
        color="negative"
        size="xs"
        padding="xs"
        round
        icon="remove"
        @click="deleteAtbat(index)"
      ></q-btn>
    </q-card>
    <q-btn
      color="secondary"
      size="xs"
      padding="xs"
      round
      icon="add"
      @click="addAtbat"
    ></q-btn>
  </div>
</template>
<script lang="ts" setup>
import { AtbatResultClass } from "@/adapters/adapter";

const atbatResults = defineModel<AtbatResultClass[]>("atbatResults", {
  default: [
    {
      inning: 1,
      isScpos: false,
      result: "　　",
      position: 1,
    },
  ],
});

function addAtbat() {
  atbatResults.value.push({
    inning: 1,
    is_scpos: false,
    result: "　　",
    position: 1,
  });
}

function deleteAtbat(index: number) {
  atbatResults.value.splice(index, 1);
}
</script>
