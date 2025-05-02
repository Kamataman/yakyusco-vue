<template>
  <div :style="{ color: atbatResult.is_scpos ? 'red' : 'black' }">
    {{ atbatExpression(atbatResult) }}
  </div>
</template>
<script setup lang="ts">
import { AtbatResultClass } from "@/adapters/adapter";

defineProps({
  atbatResult: {
    type: AtbatResultClass,
    default: () => [],
  },
});

function atbatExpression(atbatResult: AtbatResultClass): string {
  const resultExpression: Record<string, string> = {
    SH: "安",
    DH: "２",
    TH: "３",
    HR: "本",
    RH: "走本",
    SB: "犠打",
    SF: "犠飛",
    DP: "併打",
    GO: "ゴロ",
    FO: "飛",
    LO: "直",
    MP: "失",
    FF: "邪飛",
    FC: "野選",
    KO: "空三振",
    MK: "見三振",
    BB: "四球",
    IB: "故意四",
    HP: "死球",
    DT: "振逃",
    BI: "打撃妨",
    RI: "守妨害",
  };
  //   type ResultKey = keyof typeof resultExpression;
  //   const atbatResultKey: ResultKey = atbatResult.result as ResultKey;
  const positionExpression: Record<number, string> = {
    1: "投",
    2: "捕",
    3: "一",
    4: "二",
    5: "三",
    6: "遊",
    7: "左",
    8: "中",
    9: "右",
  };
  let returnExpression;

  if (atbatResult.position) {
    returnExpression =
      positionExpression[atbatResult.position] +
      resultExpression[atbatResult.result];
  } else {
    returnExpression = resultExpression[atbatResult.result];
  }
  return returnExpression;
}
</script>
