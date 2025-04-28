export type GameResult = {
  team_id: string;
  is_ff: boolean;
  date: string;
  bf_Team_name: string;
  ff_Team_name: string;
  winlose: string;
  review: string;
  place: string;
  innings: number;
  bf_runs: number[];
  ff_runs: number[];
  bf_total_runs: number;
  ff_total_runs: number;
  is_X: boolean;
  id: number;
};

type GameResultToScoreBoard = {
  bf_Team_name: string;
  ff_Team_name: string;
  bf_runs: number[];
  ff_runs: number[];
};

export type ScoreBoardRow = {
  team: string;
  total: number;
  [key: string]: string | number;
};

/**
 * GameResult を ScoreBoard の rows に変換する関数
 * @param result GameResult オブジェクト
 * @returns ScoreBoardRow[]
 */
export function transformGameResultToScoreData(
  result: GameResultToScoreBoard
): ScoreBoardRow[] {
  return [
    {
      team: result.bf_Team_name,
      ...result.bf_runs.reduce((acc, run, index) => {
        acc[`inning${index + 1}`] = run;
        return acc;
      }, {} as { [key: string]: number }),
      total: result.bf_runs.reduce((sum, run) => sum + run, 0),
    },
    {
      team: result.ff_Team_name,
      ...result.ff_runs.reduce((acc, run, index) => {
        acc[`inning${index + 1}`] = run;
        return acc;
      }, {} as { [key: string]: number }),
      total: result.ff_runs.reduce((sum, run) => sum + run, 0),
    },
  ];
}

export function getWinLoseExpression(winlose: string): string {
  switch (winlose) {
    case "W":
      return "勝利！！";
    case "L":
      return "敗北．．．";
    case "D":
      return "引き分け";
    default:
      return "";
  }
}
