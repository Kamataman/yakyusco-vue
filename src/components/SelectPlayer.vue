<template>
  <template v-if="isEdit">
    <q-select
      v-model="playerId"
      :options="options"
      emit-value
      map-options
    ></q-select>
  </template>
  <template v-else>
    {{
      options.find((option) => option.value === playerId)?.label ??
      "未登録の選手"
    }}
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/plugins/axios";

defineProps<{
  isEdit: boolean;
}>();
const playerId = defineModel<number>("playerId", {});
const options = ref<
  {
    label: string;
    value: number;
  }[]
>([]);

onMounted(async () => {
  const route = useRoute(); // 現在のルート情報を取得
  const teamId = route.params.team as string; // URLのパラメータからteamを取得
  try {
    const response = await axiosInstance.get(`/teams/${teamId}/players/`); // URLから取得したteamIdを使用

    response.data.forEach(
      (player: { id: number; name: string; number: string }) => {
        options.value.push({
          label: `#${player.number} ${player.name}`,
          value: player.id,
        });
      }
    );
  } catch (error) {
    console.error("選手データの取得に失敗しました:", error);
  }
});
</script>
