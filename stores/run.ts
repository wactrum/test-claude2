// Run Store - manages current run state

import { defineStore } from 'pinia'
import type { Difficulty } from '~/types'

export const useRunStore = defineStore('run', {
  state: () => ({
    active: false,
    seed: '',
    difficulty: 'normal' as Difficulty,
    currentFloor: 1,
    startTime: 0,
    playTime: 0
  }),

  getters: {
    isRunActive: (state) => state.active,
    currentDifficulty: (state) => state.difficulty,
    runSeed: (state) => state.seed,
    elapsedTime: (state) => {
      if (!state.active) return state.playTime
      return state.playTime + (Date.now() - state.startTime)
    }
  },

  actions: {
    // Start a new run
    startRun(difficulty: Difficulty = 'normal') {
      this.active = true
      this.difficulty = difficulty
      this.seed = this.generateSeed()
      this.currentFloor = 1
      this.startTime = Date.now()
      this.playTime = 0
    },

    // Generate random seed
    generateSeed(): string {
      return Math.random().toString(36).substring(2, 15) +
             Math.random().toString(36).substring(2, 15)
    },

    // Update floor
    setFloor(floor: number) {
      this.currentFloor = floor
    },

    // End run (success or failure)
    endRun() {
      if (this.active) {
        this.playTime += Date.now() - this.startTime
      }
      this.active = false
    },

    // Pause/Resume (for save/load)
    pause() {
      if (this.active && this.startTime > 0) {
        this.playTime += Date.now() - this.startTime
        this.startTime = 0
      }
    },

    resume() {
      if (this.active) {
        this.startTime = Date.now()
      }
    },

    // Reset run
    reset() {
      this.active = false
      this.seed = ''
      this.difficulty = 'normal'
      this.currentFloor = 1
      this.startTime = 0
      this.playTime = 0
    }
  }
})
