<template>
  <div class="card-container p-4" :class="{ 'opacity-50': character.isDead }">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="text-xl font-bold">{{ character.name }}</h3>
        <p class="text-sm text-slate-400">
          Level {{ character.level }} {{ character.race.name }} {{ character.class.name }}
        </p>
        <p class="text-xs text-slate-500">{{ character.profession.name }}</p>
      </div>
      <div v-if="character.isDead" class="text-red-500 font-bold">DEAD</div>
    </div>

    <!-- HP Bar -->
    <div class="mb-4">
      <div class="flex justify-between text-sm mb-1">
        <span>HP</span>
        <span>{{ character.hp }} / {{ character.maxHp }}</span>
      </div>
      <div class="w-full bg-slate-700 rounded-full h-2">
        <div
          class="hp-bar"
          :style="{ width: `${(character.hp / character.maxHp) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-6 gap-2 mb-3">
      <div class="stat-box" v-for="(value, stat) in character.stats" :key="stat">
        <span class="text-xs text-slate-400 uppercase">{{ stat }}</span>
        <span class="font-bold">{{ value }}</span>
        <span class="text-xs text-slate-500">{{ getStatModifier(value) >= 0 ? '+' : '' }}{{ getStatModifier(value) }}</span>
      </div>
    </div>

    <!-- Cards -->
    <div class="text-sm text-slate-400">
      <span>Deck: {{ character.deck.length }} cards</span>
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
