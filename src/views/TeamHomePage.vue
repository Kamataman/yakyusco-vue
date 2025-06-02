<template>
  <BaseLayout>
    <template #title>
      <span v-if="!isEdit">{{ team.team_name }}</span>
      <input v-else v-model="editTeam.team_name" />
    </template>
    <template #default>
      <template v-if="isLoading"><LoadingComponent /></template>
      <template v-else>
        <div v-if="!isEdit">
          <p>{{ team.description }}</p>
          <template v-if="isEditable"
            ><q-btn color="primary" @click="startEdit">編集</q-btn></template
          >
        </div>
        <div v-else>
          <q-input
            v-model="editTeam.description"
            label="チーム紹介"
            type="textarea"
            autogrow
          />
          <div class="q-mt-md">
            <q-btn color="primary" @click="saveEdit">保存</q-btn>
            <q-btn flat @click="cancelEdit" class="q-ml-sm">キャンセル</q-btn>
          </div>
        </div>
      </template></template
    >
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { axiosInstance, authAxiosInstance } from "@/plugins/axios";
import { userTeamId } from "@/auth";
import BaseLayout from "@/components/BaseLayout.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import router from "@/router";

const route = useRoute();
const teamId = route.params.team as string;

const team = ref<{ id: string; team_name: string; description: string }>({
  id: "",
  team_name: "",
  description: "",
});
const isEdit = ref(false);
const editTeam = ref({ team_name: "", description: "" });

const isEditable = computed<boolean>(() => {
  return teamId === userTeamId.value;
}); // 編集可能かどうか
const isLoading = ref(true); // データの読み込み状態

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/teams/${teamId}`);
    team.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error("チームデータの取得に失敗しました:", error);
    router.push({ path: "/" });
  }
});

function startEdit() {
  editTeam.value = { ...team.value };
  isEdit.value = true;
}

async function saveEdit() {
  try {
    const response = await authAxiosInstance.put(
      `/teams/${teamId}`,
      editTeam.value
    );
    team.value = response.data;
    isEdit.value = false;
  } catch (error) {
    alert("保存に失敗しました");
  }
}

function cancelEdit() {
  isEdit.value = false;
}
</script>
