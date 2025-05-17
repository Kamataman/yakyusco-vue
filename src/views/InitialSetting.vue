<template>
  <div class="initial-setting-container">
    <h3>チーム初期設定</h3>
    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label for="team-id">チームID</label>
        <input
          id="team-id"
          type="text"
          v-model="teamId"
          placeholder="チームIDを入力"
          required
        />
      </div>
      <div class="form-group">
        <label for="team-name">チーム名</label>
        <input
          id="team-name"
          type="text"
          v-model="teamName"
          placeholder="チーム名を入力"
          required
        />
      </div>
      <div class="form-group">
        <label for="team-description">チーム紹介</label>
        <textarea
          id="team-description"
          v-model="teamDescription"
          placeholder="チーム紹介を入力"
          required
        ></textarea>
      </div>
      <button type="submit">保存</button>
      <RouterLink to="/jesus" exact>サンプルチームを見る</RouterLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { authAxiosInstance } from "@/plugins/axios";
import router from "@/router";

const teamId = ref("");
const teamName = ref("");
const teamDescription = ref("");

async function handleSave() {
  if (!teamId.value || !teamName.value || !teamDescription.value) {
    alert("すべてのフィールドを入力してください。");
    return;
  }

  try {
    await authAxiosInstance.post(`/teams/`, {
      id: teamId.value,
      team_name: teamName.value,
      description: teamDescription.value,
    });
    alert("チーム初期設定が保存されました！");
    router.push({ name: "home", params: { team: `${teamId.value}` } });
  } catch (error) {
    alert("初期設定に失敗しました。");
  }
}
</script>

<style scoped>
.initial-setting-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
