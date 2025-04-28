import { describe, it, expect } from "vitest";
import { transformGameResultToScoreData } from "@/adapters/adapter";

describe("transformGameResultToScoreData", () => {
  it("should transform GameResult into ScoreBoardRow[]", () => {
    const gameResult = {
      bf_Team_name: "Team A",
      ff_Team_name: "Team B",
      bf_runs: [1, 2, 0, 3],
      ff_runs: [0, 1, 2, 1],
    };

    const expected = [
      {
        team: "Team A",
        inning1: 1,
        inning2: 2,
        inning3: 0,
        inning4: 3,
        total: 6,
      },
      {
        team: "Team B",
        inning1: 0,
        inning2: 1,
        inning3: 2,
        inning4: 1,
        total: 4,
      },
    ];

    const result = transformGameResultToScoreData(gameResult);

    expect(result).toEqual(expected);
  });

  it("should handle empty runs", () => {
    const gameResult = {
      bf_Team_name: "Team A",
      ff_Team_name: "Team B",
      bf_runs: [],
      ff_runs: [],
    };

    const expected = [
      {
        team: "Team A",
        total: 0,
      },
      {
        team: "Team B",
        total: 0,
      },
    ];

    const result = transformGameResultToScoreData(gameResult);

    expect(result).toEqual(expected);
  });

  it("should handle uneven innings", () => {
    const gameResult = {
      bf_Team_name: "Team A",
      ff_Team_name: "Team B",
      bf_runs: [1, 2],
      ff_runs: [0, 1, 3],
    };

    const expected = [
      {
        team: "Team A",
        inning1: 1,
        inning2: 2,
        total: 3,
      },
      {
        team: "Team B",
        inning1: 0,
        inning2: 1,
        inning3: 3,
        total: 4,
      },
    ];

    const result = transformGameResultToScoreData(gameResult);

    expect(result).toEqual(expected);
  });
});
