<template>
  <div class="row">
    <q-card v-for="(atbatResult, index) in atbatResults">
      <div class="row">
        <q-input
          v-model="atbatResult.inning"
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
            { label: '三振', value: 'K' },
            { label: 'ゴロ', value: 'GO' },
            { label: 'フライ', value: 'FO' },
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
