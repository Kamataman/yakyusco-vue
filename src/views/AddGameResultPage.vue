<script setup>
// import BattingResultRow from "./BattingResultRow.vue";
// import PitchingResultRow from "./PitchingResultRow.vue";

function addBattingResult() {
  store.battingResults.push({
    playerName: "",
    position: "",
    atbatForms: Array(9).fill(""), // 9回分
  });
}

function removeBattingResult(index) {
  store.battingResults.splice(index, 1);
}

function addPitchingResult() {
  store.pitchingResults.push({
    pitcherName: "",
    innings: "",
    // 他の項目も同様に追加
  });
}

function removePitchingResult(index) {
  store.pitchingResults.splice(index, 1);
}

function submit() {
  console.log("submit data:", store.$state);
  // バリデーション & API送信など
}
</script>

<template>
  <h3>試合結果入力</h3>
  <form @submit.prevent="submit">
    <!-- 基本情報 -->
    <div>
      <label>試合区分</label>
      <input type="checkbox" v-model="store.isFF" /> FF戦
    </div>
    <div>
      <input v-model="store.date" type="date" />
      <input v-model="store.place" placeholder="場所" />
    </div>

    <!-- スコア入力 -->
    <div>
      <h3>スコア</h3>
      <div>
        <input v-model="store.bfTeamName" placeholder="先攻チーム名" />
        <div v-for="(score, i) in store.bfInningScores" :key="i">
          <input
            v-model="store.bfInningScores[i]"
            @input="store.calculateTotals"
          />
        </div>
        <input :value="store.bfTotalRuns" readonly />
      </div>
      <div>
        <input v-model="store.ffTeamName" placeholder="後攻チーム名" />
        <div v-for="(score, i) in store.ffInningScores" :key="i">
          <input
            v-model="store.ffInningScores[i]"
            @input="store.calculateTotals"
          />
        </div>
        <input :value="store.ffTotalRuns" readonly />
      </div>
    </div>

    <!-- 打撃成績 -->
    <div>
      <h3>打撃成績</h3>
      <button @click="addBattingResult">行を追加</button>
      <div v-for="(row, i) in store.battingResults" :key="i">
        <BattingResultRow :row="row" @remove="removeBattingResult(i)" />
      </div>
    </div>

    <!-- 投手成績 -->
    <div>
      <h3>投手成績</h3>
      <button @click="addPitchingResult">行を追加</button>
      <div v-for="(row, i) in store.pitchingResults" :key="i">
        <PitchingResultRow :row="row" @remove="removePitchingResult(i)" />
      </div>
    </div>

    <button type="submit">登録</button>
  </form>
</template>
