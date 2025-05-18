import { useRoute } from "vue-router";

export type ScoreBoardRow = {
  team: string;
  total: number;
  [key: string]: string | number;
};

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

export class GameResultClass {
  id: number | undefined;
  team_id: string;
  is_ff: boolean;
  date: Date;
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

  constructor(data?: any) {
    this.id = data?.id ?? undefined;
    this.team_id = data?.team_id ?? "";
    this.is_ff = data?.is_ff ?? false;

    // 文字列でもDateとして処理できるように変換
    this.date = data?.date ? new Date(data.date) : new Date();

    this.bf_Team_name = data?.bf_Team_name ?? "";
    this.ff_Team_name = data?.ff_Team_name ?? "";
    this.winlose = data?.winlose ?? "W";
    this.review = data?.review ?? "";
    this.place = data?.place ?? "";
    this.innings = data?.innings ?? 1;
    this.bf_runs = data?.bf_runs ?? [0];
    this.ff_runs = data?.ff_runs ?? [0];
    this.bf_total_runs = data?.bf_total_runs ?? 0;
    this.ff_total_runs = data?.ff_total_runs ?? 0;
    this.is_X = data?.is_X ?? false;

    //   this.batting_results = (
    //     data?.batting_results ?? [new BattingResultClass()]
    //   ).map((b: any) => new BattingResultClass(b));

    //   this.pitching_results = (
    //     data?.pitching_results ?? [new PitchingResultClass()]
    //   ).map((p: any) => new PitchingResultClass(p));
    this.batting_results =
      data?.batting_results ??
      Array.from(
        { length: 1 },
        (_, i) => new BattingResultClass({ batting_order: i + 1 })
      );
    this.pitching_results =
      data?.pitching_results ??
      Array.from(
        { length: 1 },
        (_, i) => new PitchingResultClass({ pitching_order: i + 1 })
      );
  }

  transformGameResultToScoreData(): ScoreBoardRow[] {
    return [
      {
        team: this.bf_Team_name,
        ...this.bf_runs.reduce((acc, run, index) => {
          acc[`inning${index + 1}`] = run;
          return acc;
        }, {} as { [key: string]: number }),
        total: this.bf_runs.reduce((sum, run) => sum + run, 0),
      },
      {
        team: this.ff_Team_name,
        ...this.ff_runs.reduce((acc, run, index) => {
          acc[`inning${index + 1}`] = run;
          return acc;
        }, {} as { [key: string]: number }),
        total: this.ff_runs.reduce((sum, run) => sum + run, 0),
      },
    ];
  }

  getScoreDataForGameResult(scoreBoardRows: ScoreBoardRow[]): void {
    function scoreDataToRuns(scoreBoardRow: ScoreBoardRow): number[] {
      return Object.entries(scoreBoardRow)
        .filter(([key]) => key.startsWith("inning"))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, value]) => value as number);
    }

    this.bf_Team_name = scoreBoardRows[0].team;
    this.ff_Team_name = scoreBoardRows[1].team;
    this.bf_runs = scoreDataToRuns(scoreBoardRows[0]);
    this.ff_runs = scoreDataToRuns(scoreBoardRows[1]);
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
