<template>
  <div class="relative flex items-center justify-center h-screen overflow-hidden">
    <!-- Background Image -->
    <div
      class="scene-bg"
      style="background-image: url('/images/u4419938122_Warm_late-medieval_city_around_a_large_stone_chas_3f0ce0e3-7c84-4892-9950-f138f72c7ff6_0.png')"
    ></div>
    <div class="scene-overlay"></div>

    <!-- Content -->
    <div class="relative z-10 text-center space-y-10 animate-fade-in px-4">
      <!-- Title -->
      <div class="space-y-6">
        <h1 class="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
          Card Roguelike
        </h1>
        <p class="text-2xl md:text-3xl text-slate-200 font-light tracking-wide">
          A tactical fantasy adventure
        </p>
      </div>

      <!-- Menu Options -->
      <div class="space-y-5 mt-12">
        <button
          @click="newGame"
          class="btn-primary w-80 py-5 text-xl glow-effect"
        >
          New Game
        </button>

        <button
          @click="continueGame"
          :disabled="!hasSaveGame"
          class="btn-secondary w-80 py-5 text-xl"
          :class="{ 'opacity-40 cursor-not-allowed hover:scale-100': !hasSaveGame }"
        >
          Continue
        </button>

        <button
          @click="showSettings = true"
          class="btn-secondary w-80 py-5 text-xl"
        >
          Settings
        </button>
      </div>

      <!-- Version -->
      <p class="text-base text-slate-400 mt-8">v1.0.0 MVP</p>
    </div>

    <!-- Settings Modal -->
    <div
      v-if="showSettings"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      @click.self="showSettings = false"
    >
      <div class="card-container-light p-10 max-w-lg w-full mx-4 space-y-6">
        <h2 class="text-3xl font-bold mb-6">Settings</h2>

        <div class="space-y-6">
          <div>
            <label class="block text-lg font-semibold mb-3">Master Volume</label>
            <input
              v-model="gameStore.masterVolume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <div class="text-right text-sm text-slate-400 mt-1">
              {{ Math.round(gameStore.masterVolume * 100) }}%
            </div>
          </div>

          <div>
            <label class="block text-lg font-semibold mb-3">Music Volume</label>
            <input
              v-model="gameStore.musicVolume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <div class="text-right text-sm text-slate-400 mt-1">
              {{ Math.round(gameStore.musicVolume * 100) }}%
            </div>
          </div>

          <div>
            <label class="block text-lg font-semibold mb-3">SFX Volume</label>
            <input
              v-model="gameStore.sfxVolume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <div class="text-right text-sm text-slate-400 mt-1">
              {{ Math.round(gameStore.sfxVolume * 100) }}%
            </div>
          </div>
        </div>

        <button @click="showSettings = false" class="btn-primary w-full mt-8 py-4">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game'
import { hasSaveFile, loadGame, deleteSaveFile } from '~/utils/saveLoad'

const emit = defineEmits<{
  (e: 'start-game'): void
}>()

const gameStore = useGameStore()
const showSettings = ref(false)
const hasSaveGame = ref(false)

function newGame() {
  if (hasSaveFile()) {
    deleteSaveFile()
  }
  emit('start-game')
}

async function continueGame() {
  if (hasSaveGame.value) {
    const success = await loadGame()
    if (success) {
      emit('start-game')
    }
  }
}

onMounted(() => {
  hasSaveGame.value = hasSaveFile()
})
</script>
