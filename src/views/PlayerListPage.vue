<template>
  <BaseLayout
    ><template #title>選手一覧</template>
    <template #default>
      <template v-if="isEditable">
        <q-btn
          label="選手を追加"
          color="primary"
          @click="isModalOpen = true"
          class="q-mb-md"
        />
      </template>
      <div class="row q-pa-sm">
        <template v-if="players.length === 0">
          <div class="text-h6">選手が登録されていません。</div>
        </template>
        <template v-else>
          <div
            v-for="(player, i) in players"
            :key="i"
            class="q-pa-xs"
            style="width: 20rem"
          >
            <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">{{ player.name }}</div>
                <div class="text-subtitle2">#{{ player.number }}</div>
              </q-card-section>

              <q-separator />
              <template v-if="isEditable">
                <q-card-actions>
                  <q-btn flat label="編集" @click="openEditModal(player)" />
                  <q-btn
                    flat
                    label="削除"
                    color="negative"
                    @click="deletePlayer(player.id)"
                  /> </q-card-actions
              ></template>
            </q-card>
          </div>
        </template>
      </div>

      <!-- モーダル -->
      <q-dialog v-model="isModalOpen">
        <q-card style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">
              {{ isEditMode ? "選手を編集" : "選手を追加" }}
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="newPlayer.name"
              label="名前"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="newPlayer.number"
              label="背番号"
              outlined
              type="text"
              class="q-mb-md"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="キャンセル"
              color="negative"
              @click="resetModal"
            />
            <q-btn
              flat
              label="保存"
              color="positive"
              @click="addOrUpdatePlayer"
            />
          </q-card-actions>
        </q-card>
      </q-dialog> </template
  ></BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router"; // useRouteをインポート
import { axiosInstance, authAxiosInstance } from "@/plugins/axios"; // axios設定をインポート
import { userTeamId } from "@/auth";

import BaseLayout from "@/components/BaseLayout.vue";

const route = useRoute(); // 現在のルート情報を取得
const teamId = route.params.team as string; // URLのパラメータからteamを取得

const players = ref<
  {
    id: number;
    name: string;
    number: string;
  }[]
>([]);

const isEditable = computed<boolean>(() => {
  return teamId === userTeamId.value;
}); // 編集可能かどうか

const isModalOpen = ref(false); // モーダルの開閉状態
const isEditMode = ref(false); // 編集モードかどうか
const currentPlayerId = ref<number | null>(null); // 編集対象の選手ID
const newPlayer = ref<{
  name: string;
  number: string;
  team_id: string | null;
}>({
  name: "",
  number: "",
  team_id: null,
}); // 新しい選手または編集中の選手のデータ

const addOrUpdatePlayer = async () => {
  try {
    if (isEditMode.value && currentPlayerId.value !== null) {
      // 編集モードの場合
      const response = await authAxiosInstance.put(
        `/players/${currentPlayerId.value}`,
        newPlayer.value
      );
      const index = players.value.findIndex(
        (p) => p.id === currentPlayerId.value
      );
      players.value[index] = response.data; // 編集した選手をリストに反映
    } else {
      // 新規追加の場合
      newPlayer.value.team_id = teamId; // URLから取得したteamIdを設定
      const response = await authAxiosInstance.post(
        "/players/",
        newPlayer.value
      );
      players.value.push(response.data); // 追加した選手をリストに反映
    }
    resetModal();
  } catch (error) {
    window.alert("選手の追加または編集に失敗しました。");
    console.error("選手の追加または編集に失敗しました:", error);
  }
};

const deletePlayer = async (id: number) => {
  try {
    await authAxiosInstance.delete(`/players/${id}`);
    players.value = players.value.filter((player) => player.id !== id); // 削除した選手をリストから除外
    window.alert("選手を削除しました。");
  } catch (error) {
    window.alert("選手の削除に失敗しました。");
    console.error("選手の削除に失敗しました:", error);
  }
};

const openEditModal = (player: {
  id: number;
  name: string;
  number: string;
}) => {
  isEditMode.value = true;
  currentPlayerId.value = player.id;
  newPlayer.value.name = player.name;
  newPlayer.value.number = player.number;
  isModalOpen.value = true;
};

const resetModal = () => {
  isModalOpen.value = false;
  isEditMode.value = false;
  currentPlayerId.value = null;
  newPlayer.value.name = "";
  newPlayer.value.number = "";
};

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/teams/${teamId}/players/`); // URLから取得したteamIdを使用
    players.value = response.data;
  } catch (error) {
    console.error("選手データの取得に失敗しました:", error);
  }
});
</script>
