<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> やきゅスコ </q-toolbar-title>
        <template v-if="isLogin">
          <q-btn @click="logout()">ログアウト</q-btn></template
        >
        <template v-else>
          <q-btn @click="$router.push({ name: 'login' })"
            >ログイン</q-btn
          ></template
        >
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab
          :to="{ name: 'home', params: { team: $route.params.team } }"
          label="ホーム"
          exact
        />
        <q-route-tab
          :to="{ name: 'gameresults', params: { team: $route.params.team } }"
          label="試合結果一覧"
          exact
        />
        <q-route-tab
          :to="{ name: 'players', params: { team: $route.params.team } }"
          label="選手一覧"
          exact
        />
        <q-route-tab
          :to="{ name: 'stats', params: { team: $route.params.team } }"
          label="個人成績"
          exact
        />
      </q-tabs>
    </q-header>

    <q-page-container class="q-ma-md">
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>©2025 Kamataman</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { logout, isLogin } from "@/auth";
</script>
