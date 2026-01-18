<template>
  <div class="card-container-light p-6" :class="{ 'opacity-50': character.isDead }">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-2xl font-bold text-slate-100">{{ character.name }}</h3>
        <p class="text-lg text-slate-300 mt-1">
          Level {{ character.level }} {{ character.race.name }} {{ character.class.name }}
        </p>
        <p class="text-base text-slate-400 mt-1">{{ character.profession.name }}</p>
      </div>
      <div v-if="character.isDead" class="text-red-400 font-bold text-xl px-4 py-2 bg-red-500/20 border border-red-500 rounded-xl">DEAD</div>
    </div>

    <!-- HP Bar -->
    <div class="mb-5">
      <div class="flex justify-between text-base mb-2">
        <span class="font-semibold text-slate-200">HP</span>
        <span class="font-bold text-slate-100">{{ character.hp }} / {{ character.maxHp }}</span>
      </div>
      <div class="w-full bg-slate-700 rounded-full h-3">
        <div
          class="hp-bar"
          :style="{ width: `${(character.hp / character.maxHp) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-6 gap-3 mb-4">
      <div class="stat-box text-center" v-for="(value, stat) in character.stats" :key="stat">
        <span class="text-xs text-slate-400 uppercase font-semibold block mb-1">{{ stat }}</span>
        <span class="font-bold text-lg block text-slate-100">{{ value }}</span>
        <span class="text-xs text-slate-400 block">{{ getStatModifier(value) >= 0 ? '+' : '' }}{{ getStatModifier(value) }}</span>
      </div>
    </div>

    <!-- Cards -->
    <div class="text-base text-slate-300 mt-4 pt-4 border-t border-slate-600">
      <span class="font-semibold">Deck: {{ character.deck.length }} cards</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types'
import { getStatModifier } from '~/types'

defineProps<{
  character: Character
}>()
</script>
