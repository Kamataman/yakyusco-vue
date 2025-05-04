import { useRoute } from "vue-router";

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
  batting_results: BattingResultClass[];
  pitching_results: PitchingResultClass[];
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

export function getWinLoseExpression(winlose: string | undefined): string {
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

export class BattingResultClass {
  player_id: number | undefined;
  batting_order: number;
  batting_order_num: number;
  rbi: number;
  runs: number;
  steels: number;
  position: number[];
  atbat_results: AtbatResultClass[];

  constructor(data?: {
    player_id?: number;
    batting_order?: number;
    batting_order_num?: number;
    rbi?: number;
    runs?: number;
    steels?: number;
    position?: number[];
    atbat_results?: AtbatResultClass[];
  }) {
    this.player_id = data?.player_id ?? undefined;
    this.batting_order = data?.batting_order ?? 1;
    this.batting_order_num = data?.batting_order_num ?? 1;
    this.rbi = data?.rbi ?? 0;
    this.runs = data?.runs ?? 0;
    this.steels = data?.steels ?? 0;
    this.position = data?.position ?? [0];
    this.atbat_results = data?.atbat_results ?? [new AtbatResultClass()];
  }
}

export class PitchingResultClass {
  player_id: number | undefined;
  innings: number;
  pitchs: number;
  batters: number;
  hits: number;
  homeruns: number;
  strikeouts: number;
  walks: number;
  hit_by_pitch: number;
  balks: number;
  runs: number;
  earned_runs: number;
  result: string;
  pitching_order: number;

  constructor(data?: {
    player_id?: number;
    innings?: number;
    pitchs?: number;
    batters?: number;
    hits?: number;
    homeruns?: number;
    strikeouts?: number;
    walks?: number;
    hit_by_pitch?: number;
    balks?: number;
    runs?: number;
    earned_runs?: number;
    result?: string;
    pitching_order?: number;
  }) {
    this.player_id = data?.player_id ?? undefined;
    this.innings = data?.innings ?? 0;
    this.pitchs = data?.pitchs ?? 0;
    this.batters = data?.batters ?? 0;
    this.hits = data?.hits ?? 0;
    this.homeruns = data?.homeruns ?? 0;
    this.strikeouts = data?.strikeouts ?? 0;
    this.walks = data?.walks ?? 0;
    this.hit_by_pitch = data?.hit_by_pitch ?? 0;
    this.balks = data?.balks ?? 0;
    this.runs = data?.runs ?? 0;
    this.earned_runs = data?.earned_runs ?? 0;
    this.result = data?.result ?? "-";
    this.pitching_order = data?.pitching_order ?? 1;
  }
}

export class AtbatResultClass {
  inning: number;
  result: string;
  position?: number;
  is_scpos: boolean;

  constructor(data?: {
    inning?: number;
    result?: string;
    position?: number;
    is_scpos?: boolean;
  }) {
    this.inning = data?.inning ?? 0;
    this.result = data?.result ?? "";
    this.position = data?.position ?? undefined;
    this.is_scpos = data?.is_scpos ?? false;
  }
}

export function getTeamIdFromUrl() {
  const route = useRoute(); // 現在のルート情報を取得
  const teamId = route.params.team as string; // URLのパラメータからteamを取得
  return teamId;
}
