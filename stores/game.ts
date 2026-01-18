// Game Store - manages overall game state and progress

import { defineStore } from 'pinia'
import type { GameProgress, LoreEntry } from '~/types'

export type GameScene = 'menu' | 'hub' | 'dungeon' | 'event' | 'combat' | 'lore'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentScene: 'menu' as GameScene,

    // Game progress
    progress: {
      totalRunsCompleted: 0,
      totalDeaths: 0,
      highestFloor: 1,
      bossesDefeated: [],
      eventsCompleted: [],
      loreUnlocked: []
    } as GameProgress,

    // Lore archive
    loreEntries: [] as LoreEntry[],

    // UI state
    isPaused: false,
    showSettings: false,

    // Audio settings
    musicVolume: 0.7,
    sfxVolume: 0.8,
    masterVolume: 1.0
  }),

  getters: {
    isLoreUnlocked: (state) => (loreId: string) => {
      return state.progress.loreUnlocked.includes(loreId)
    },

    isBossDefeated: (state) => (bossId: string) => {
      return state.progress.bossesDefeated.includes(bossId)
    },

    totalBossesDefeated: (state) => state.progress.bossesDefeated.length
  },

  actions: {
    // Scene management
    setScene(scene: GameScene) {
      this.currentScene = scene
    },

    // Progress tracking
    completeRun() {
      this.progress.totalRunsCompleted++
    },

    recordDeath() {
      this.progress.totalDeaths++
    },

    updateHighestFloor(floor: number) {
      if (floor > this.progress.highestFloor) {
        this.progress.highestFloor = floor
      }
    },

    defeatBoss(bossId: string) {
      if (!this.progress.bossesDefeated.includes(bossId)) {
        this.progress.bossesDefeated.push(bossId)
      }
    },

    completeEvent(eventId: string) {
      if (!this.progress.eventsCompleted.includes(eventId)) {
        this.progress.eventsCompleted.push(eventId)
      }
    },

    unlockLore(loreId: string) {
      if (!this.progress.loreUnlocked.includes(loreId)) {
        this.progress.loreUnlocked.push(loreId)
      }
    },

    // Lore management
    addLoreEntry(entry: LoreEntry) {
      if (!this.loreEntries.find(l => l.id === entry.id)) {
        this.loreEntries.push({
          ...entry,
          unlockedDate: Date.now()
        })
      }
    },

    // UI management
    togglePause() {
      this.isPaused = !this.isPaused
    },

    toggleSettings() {
      this.showSettings = !this.showSettings
    },

    // Audio settings
    setMusicVolume(volume: number) {
      this.musicVolume = Math.max(0, Math.min(1, volume))
    },

    setSfxVolume(volume: number) {
      this.sfxVolume = Math.max(0, Math.min(1, volume))
    },

    setMasterVolume(volume: number) {
      this.masterVolume = Math.max(0, Math.min(1, volume))
    },

    // Reset progress (new game+)
    resetProgress() {
      this.progress = {
        totalRunsCompleted: 0,
        totalDeaths: 0,
        highestFloor: 1,
        bossesDefeated: [],
        eventsCompleted: [],
        loreUnlocked: []
      }
    }
  }
})
