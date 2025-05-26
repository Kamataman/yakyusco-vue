<template>
  <div class="register-container">
    <h3>新規登録</h3>
    <form @submit.prevent="handleRegister">
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
      <div class="form-group">
        <label for="confirm-password">パスワードの確認</label>
        <input
          id="confirm-password"
          type="password"
          v-model="confirmPassword"
          placeholder="パスワードを再入力"
          required
        />
      </div>
      <button type="submit">登録</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { signUp } from "@/auth.ts";
import router from "@/router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

async function handleRegister() {
  if (!email.value || !password.value || !confirmPassword.value) {
    alert("すべてのフィールドを入力してください。");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("パスワードが一致しません。");
    return;
  }

  // Firebase を使用したユーザ登録処理
  try {
    await signUp(email.value, password.value);
    window.alert("ユーザー登録が完了しました！");
    // 初期設定画面に遷移
    router.push({ name: "initialsetting" });
  } catch (error: any) {
    // const errorCode = error.code;
    const errorMessage = error.message;
    window.alert("ユーザー登録に失敗しました。" + errorMessage);
  }
}
</script>

<style scoped>
.register-container {
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
