<template>
  <BaseLayout
    ><template #title>{{ team.team_name }}</template>
    <template #default>
      <p>{{ team.description }}</p>
    </template></BaseLayout
  >
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // useRouteをインポート
import { axiosInstance } from "@/plugins/axios"; // axios設定をインポート

import BaseLayout from "@/components/BaseLayout.vue";
import router from "@/router";

const route = useRoute(); // 現在のルート情報を取得
const teamId = route.params.team as string; // URLのパラメータからteamを取得

const team = ref<{
  id: string;
  team_name: string;
  description: string;
}>({ id: "", team_name: "", description: "" }); // チーム情報を格納するref

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/teams/${teamId}`);
    team.value = response.data;
  } catch (error) {
    console.error("チームデータの取得に失敗しました:", error);
    router.push({ path: "/" });
  }
});
</script>
