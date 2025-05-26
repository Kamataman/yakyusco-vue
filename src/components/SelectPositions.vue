<template>
  <div class="row">
    <template v-if="isEdit">
      <template v-for="(_position, i) in positions" :key="i">
        <q-select
          v-model="positions[i]"
          :options="positionOptions"
          dense
          emit-value
          map-options
        ></q-select>
      </template>
      <q-btn
        color="secondary"
        size="xs"
        padding="xs"
        round
        icon="add"
        @click="addPosition"
      ></q-btn
    ></template>
    <template v-else>
      <span v-for="(position, i) in positions" :key="i">
        {{ positionOptions.find((option) => option.value === position)?.label }}
      </span>
    </template>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  isEdit: boolean;
}>();
const positions = defineModel<number[]>("positions", {
  default: [1, 6],
});

const positionOptions = [
  { label: "DH", value: 0 },
  { label: "投", value: 1 },
  { label: "捕", value: 2 },
  { label: "一", value: 3 },
  { label: "二", value: 4 },
  { label: "三", value: 5 },
  { label: "遊", value: 6 },
  { label: "左", value: 7 },
  { label: "中", value: 8 },
  { label: "右", value: 9 },
  { label: "打", value: 10 },
  { label: "走", value: 11 },
];

function addPosition() {
  positions.value.push(1);
}
</script>
