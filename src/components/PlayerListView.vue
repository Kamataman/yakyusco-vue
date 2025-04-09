<script setup lang="ts">
const players=[
    {
        name: "Ohtani",
        number: "17",
    },
    {
        name: "Herunandesu",
        number: "1",
    },
    {
        name: "Freeman",
        number: "3",
    },
    {
        name: "Edoman",
        number: "4",
    },
    {
        name: "Bettu",
        number: "6",
    },
]

</script>
<template>
    <q-h3>選手一覧</q-h3>
    <div v-for="(player,i) in players" :key="i">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{player.name}}</div>
        <div class="text-subtitle2">#{{player.number}}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat>編集</q-btn>
        <q-btn flat>削除</q-btn>
      </q-card-actions>
    </q-card>
</div>
</template>