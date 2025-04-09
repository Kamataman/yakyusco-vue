// stores/gameResultStore.ts
import { defineStore } from 'pinia'

export const useGameResultStore = defineStore('gameResult', {
  state: () => ({
    isFF: false,
    date: '',
    place: '',
    bfTeamName: '',
    ffTeamName: '',
    bfInningScores: Array(9).fill(''),
    ffInningScores: Array(9).fill(''),
    bfTotalRuns: 0,
    ffTotalRuns: 0,
    review: '',
    battingResults: [],
    pitchingResults: []
  }),
  actions: {
    calculateTotals() {
      this.bfTotalRuns = this.bfInningScores.reduce((sum, v) => sum + (+v || 0), 0)
      this.ffTotalRuns = this.ffInningScores.reduce((sum, v) => sum + (+v || 0), 0)
    }
  }
})
