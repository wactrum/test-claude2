<template>
  <div
    class="card-container p-3 w-40 cursor-pointer transition-all duration-200 hover:scale-105"
    :class="{
      'opacity-50 cursor-not-allowed': !canPlay,
      'ring-2 ring-blue-500': isSelected
    }"
    @click="handleClick"
  >
    <!-- Energy Cost -->
    <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
      {{ cardData.energyCost }}
    </div>

    <!-- Card Name -->
    <h4 class="font-bold text-sm mb-2">{{ cardData.name }}</h4>

    <!-- Card Type -->
    <div class="mb-2">
      <span
        class="text-xs px-2 py-1 rounded"
        :class="getTypeColor(cardData.type)"
      >
        {{ cardData.type }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-xs text-slate-300 mb-2">{{ cardData.description }}</p>

    <!-- Effects Preview -->
    <div class="text-xs text-slate-400">
      <div v-for="(effect, i) in cardData.effects" :key="i">
        {{ formatEffect(effect) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card, CardEffect, CardType } from '~/types'
import { getCard } from '~/data'

const props = defineProps<{
  cardId: string
  canPlay: boolean
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()

const cardData = computed(() => {
  const card = getCard(props.cardId)
  return card || {
    id: props.cardId,
    name: 'Unknown',
    type: 'attack' as CardType,
    description: '',
    energyCost: 0,
    targetType: 'self' as const,
    effects: [],
    upgradeLevel: 0,
    maxUpgradeLevel: 0,
    upgradeGoldCost: 0,
    rarity: 'common' as const,
    tags: []
  }
})

function handleClick() {
  if (props.canPlay) {
    emit('select')
  }
}

function getTypeColor(type: CardType): string {
  const colors: Record<CardType, string> = {
    attack: 'bg-red-700',
    defense: 'bg-blue-700',
    support: 'bg-green-700',
    control: 'bg-purple-700',
    reaction: 'bg-yellow-700',
    passive: 'bg-gray-700'
  }
  return colors[type] || 'bg-gray-700'
}

function formatEffect(effect: CardEffect): string {
  switch (effect.type) {
    case 'damage':
      return `Deal ${effect.value} damage`
    case 'heal':
      return `Heal ${effect.value} HP`
    case 'block':
      return `Gain ${effect.value} block`
    case 'draw':
      return `Draw ${effect.value} cards`
    case 'buff':
    case 'debuff':
      return effect.statusEffect?.id || effect.description
    default:
      return effect.description
  }
}
</script>
