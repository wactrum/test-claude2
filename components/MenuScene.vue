<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 to-slate-800">
    <div class="text-center space-y-8">
      <!-- Title -->
      <div class="space-y-4">
        <h1 class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Card Roguelike RPG
        </h1>
        <p class="text-xl text-slate-400">A D&D-inspired tactical adventure</p>
      </div>

      <!-- Menu Options -->
      <div class="space-y-4">
        <button
          @click="newGame"
          class="btn-primary w-64 py-4 text-lg glow-effect"
        >
          New Game
        </button>

        <button
          @click="continueGame"
          :disabled="!hasSaveGame"
          class="btn-secondary w-64 py-4 text-lg"
          :class="{ 'opacity-50 cursor-not-allowed': !hasSaveGame }"
        >
          Continue
        </button>

        <button
          @click="showSettings = true"
          class="btn-secondary w-64 py-4 text-lg"
        >
          Settings
        </button>
      </div>

      <!-- Version -->
      <p class="text-sm text-slate-500">v1.0.0 MVP</p>
    </div>

    <!-- Settings Modal -->
    <div
      v-if="showSettings"
      class="fixed inset-0 bg-black/70 flex items-center justify-center"
      @click.self="showSettings = false"
    >
      <div class="card-container p-8 max-w-md w-full space-y-4">
        <h2 class="text-2xl font-bold mb-4">Settings</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">Master Volume</label>
            <input
              v-model="gameStore.masterVolume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Music Volume</label>
            <input
              v-model="gameStore.musicVolume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">SFX Volume</label>
            <input
              v-model="gameStore.sfxVolume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full"
            />
          </div>
        </div>

        <button @click="showSettings = false" class="btn-primary w-full mt-4">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const emit = defineEmits<{
  (e: 'start-game'): void
}>()

const gameStore = useGameStore()
const showSettings = ref(false)
const hasSaveGame = ref(false) // TODO: Check for actual save game

function newGame() {
  emit('start-game')
}

function continueGame() {
  // TODO: Load save game
  if (hasSaveGame.value) {
    emit('start-game')
  }
}

onMounted(() => {
  // TODO: Check for save game in localStorage
  const savedGame = localStorage.getItem('card-roguelike-save')
  hasSaveGame.value = !!savedGame
})
</script>
