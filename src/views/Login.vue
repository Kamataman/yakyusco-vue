<template>
  <div class="login-container">
    <h3>ログイン</h3>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="メールアドレスを入力"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="パスワードを入力"
          required
        />
      </div>
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { getLoginUserTeamId, signIn } from "@/auth.ts";
import router from "@/router";

const email = ref("");
const password = ref("");

async function handleLogin() {
  if (!email.value || !password.value) {
    alert("メールアドレスとパスワードを入力してください。");
    return;
  }

  try {
    await signIn(email.value, password.value);
    window.alert("ログインしました！");
    // カスタムクレームを確認する
    const teamId = await getLoginUserTeamId();
    if (teamId) {
      // あればチームidのurl
      router.push({ name: "teamTop", params: { team: `${teamId}` } });
    } else {
      // なければ初期設定画面
      router.push({ name: "initialsetting" });
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert("ログインに失敗しました。" + errorMessage);
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
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

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
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
