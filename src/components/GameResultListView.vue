<template>
  <h3>試合結果一覧</h3>
  <ul>
    <RouterLink to="gameresult/0">ID0の試合結果</RouterLink>
  </ul>
  <ul>
    <RouterLink to="gameresult/1">ID1の試合結果</RouterLink>
  </ul>
  <ul>
    <RouterLink to="gameresult/2">ID2の試合結果</RouterLink>
  </ul>
  <div class="flex justify-end" style="margin: 10px">
    <q-btn
      label="+"
      color="primary"
      @click="
        $router.push({
          name: 'addgameresult',
          params: { team: $route.params.team },
        })
      "
    />
  </div>
</template>
