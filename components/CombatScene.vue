<template>
  <div class="relative h-screen flex flex-col overflow-hidden">
    <!-- Background Image -->
    <div
      class="scene-bg"
      style="background-image: url('/images/u4419938122_Interior_warehouse_space_of_a_warm_late-medieva_4dda9fdf-4fe0-4aa5-b89f-3f60dd61b2cc_0.png')"
    ></div>
    <div class="scene-overlay"></div>

    <!-- Combat Result Screen -->
    <div v-if="combatStore.isCombatOver" class="relative z-10 flex-1 flex items-center justify-center">
      <div class="card-container-light p-12 max-w-md text-center">
        <h2 class="text-6xl font-bold mb-6" :class="combatStore.victory ? 'text-green-400' : 'text-red-400'">
          {{ combatStore.victory ? 'Victory!' : 'Defeat' }}
        </h2>

        <div v-if="combatStore.victory && combatStore.rewards" class="space-y-5 mb-8">
          <div class="text-2xl">
            <span class="text-amber-400 font-bold">+{{ combatStore.rewards.gold }}</span> Gold
          </div>
          <div class="text-2xl">
            <span class="text-blue-400 font-bold">+{{ combatStore.rewards.experience }}</span> XP
          </div>
        </div>

        <button @click="exitCombat" class="btn-primary w-full py-4 text-xl">
          Continue
        </button>
      </div>
    </div>

    <!-- Active Combat -->
    <div v-else class="relative z-10 flex-1 flex flex-col">
      <!-- Header -->
      <div class="p-6 border-b border-amber-600/30 bg-slate-900/60 backdrop-blur-md flex justify-between items-center">
        <div>
          <h2 class="text-4xl font-bold text-slate-100">Turn {{ combatStore.turnNumber }}</h2>
          <p class="text-lg text-slate-300 mt-1">
            {{ currentTurnEntity?.type === 'character' ? (currentTurnEntity.entity as Character).name + "'s Turn" : (currentTurnEntity?.entity as Enemy).name + "'s Turn" }}
          </p>
        </div>

        <div v-if="combatStore.isPlayerTurn && currentTurnEntity" class="flex gap-6 items-center">
          <div class="text-2xl px-6 py-3 bg-blue-950/50 rounded-xl border border-blue-600/30">
            Energy: <span class="text-blue-300 font-bold">{{ currentTurnEntity.energy }}/{{ currentTurnEntity.maxEnergy }}</span>
          </div>
          <button @click="combatStore.endTurn()" class="btn-secondary py-3 px-6 text-lg">
            End Turn
          </button>
        </div>
      </div>

      <!-- Battle Area -->
      <div class="flex-1 overflow-auto p-8 bg-slate-900/20 backdrop-blur-sm">
        <!-- Enemies -->
        <div class="mb-10">
          <h3 class="text-3xl font-bold mb-6 text-red-300">Enemies</h3>
          <div class="flex gap-6 flex-wrap">
            <div
              v-for="enemy in combatStore.aliveEnemies"
              :key="enemy.id"
              class="card-container-light p-6 w-64 cursor-pointer transition-all hover:scale-105"
              :class="{ 'ring-4 ring-red-500 glow-effect': selectedTarget === enemy.id }"
              @click="selectTarget(enemy.id)"
            >
              <h4 class="font-bold text-xl mb-3 text-red-300">{{ enemy.name }}</h4>
              <div class="mb-3">
                <div class="text-base mb-2">HP: {{ enemy.hp }}/{{ enemy.maxHp }}</div>
                <div class="w-full bg-slate-700 rounded-full h-3">
                  <div class="bg-red-600 rounded-full h-3 transition-all" :style="{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }"></div>
                </div>
              </div>
              <div v-if="enemy.statusEffects.length > 0" class="text-sm">
                <div v-for="effect in enemy.statusEffects" :key="effect.id" class="text-slate-300">
                  {{ effect.name }} ({{ effect.stacks }})
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Party -->
        <div>
          <h3 class="text-3xl font-bold mb-6 text-green-300">Your Party</h3>
          <div class="flex gap-6 flex-wrap">
            <div
              v-for="char in combatStore.aliveCharacters"
              :key="char.id"
              class="card-container-light p-6 w-64"
              :class="{ 'ring-4 ring-blue-500 glow-effect': currentCharacterId === char.id }"
            >
              <h4 class="font-bold text-xl mb-3 text-blue-300">{{ char.name }}</h4>
              <div class="mb-3">
                <div class="text-base mb-2">HP: {{ char.hp }}/{{ char.maxHp }}</div>
                <div class="w-full bg-slate-700 rounded-full h-3">
                  <div class="bg-green-600 rounded-full h-3 transition-all" :style="{ width: `${(char.hp / char.maxHp) * 100}%` }"></div>
                </div>
              </div>
              <div v-if="char.statusEffects.length > 0" class="text-sm">
                <div v-for="effect in char.statusEffects" :key="effect.id" class="text-slate-300">
                  {{ effect.name }} ({{ effect.stacks }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hand (only shown during player turn) -->
      <div v-if="combatStore.isPlayerTurn && currentCharacter" class="p-6 border-t border-amber-600/30 bg-slate-900/70 backdrop-blur-md">
        <h3 class="text-2xl font-bold mb-4 text-slate-100">Hand</h3>
        <div class="flex gap-3 overflow-x-auto">
          <CardInHand
            v-for="cardId in currentCharacter.hand"
            :key="cardId"
            :card-id="cardId"
            :can-play="canPlayCard(cardId)"
            :is-selected="selectedCard === cardId"
            @select="selectCard(cardId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCombatStore } from '~/stores/combat'
import { usePartyStore } from '~/stores/party'
import { useDungeonStore } from '~/stores/dungeon'
import { createEnemyGroup } from '~/data/enemies'
import { getCard } from '~/data'
import { needsTargetSelection } from '~/utils/cardEffects'
import type { Character, Enemy } from '~/types'

const emit = defineEmits<{
  (e: 'combat-end', victory: boolean): void
}>()

const combatStore = useCombatStore()
const partyStore = usePartyStore()
const dungeonStore = useDungeonStore()

const selectedCard = ref<string | null>(null)
const selectedTarget = ref<string | null>(null)

const currentTurnEntity = computed(() => combatStore.currentEntity)
const currentCharacter = computed(() => {
  if (currentTurnEntity.value?.type === 'character') {
    return currentTurnEntity.value.entity as Character
  }
  return null
})

const currentCharacterId = computed(() => currentCharacter.value?.id || null)

function selectCard(cardId: string) {
  selectedCard.value = cardId

  const card = getCard(cardId)
  if (!card) return

  // If card doesn't need target selection, play it immediately
  if (!needsTargetSelection(card)) {
    playSelectedCard()
  }
}

function selectTarget(targetId: string) {
  selectedTarget.value = targetId

  // If we have a card selected, play it
  if (selectedCard.value) {
    playSelectedCard()
  }
}

async function playSelectedCard() {
  if (!selectedCard.value || !currentCharacter.value) return

  const card = getCard(selectedCard.value)
  if (!card) return

  const targets = needsTargetSelection(card)
    ? (selectedTarget.value ? [selectedTarget.value] : [])
    : []

  await combatStore.playCard(currentCharacter.value.id, selectedCard.value, targets)

  // Reset selection
  selectedCard.value = null
  selectedTarget.value = null
}

function canPlayCard(cardId: string): boolean {
  if (!currentTurnEntity.value || !currentCharacter.value) return false

  const card = getCard(cardId)
  if (!card) return false

  return currentTurnEntity.value.energy >= card.energyCost
}

function exitCombat() {
  const victory = combatStore.victory

  // Award rewards
  if (victory && combatStore.rewards) {
    partyStore.addGold(combatStore.rewards.gold)
    combatStore.rewards.items.forEach(itemId => {
      partyStore.addItem(itemId)
    })
  }

  combatStore.reset()
  emit('combat-end', victory)
}

onMounted(() => {
  // Start combat if not already active
  if (!combatStore.isActive) {
    const node = dungeonStore.currentNode
    if (!node || !node.enemyGroupId) {
      // No enemies, just exit
      emit('combat-end', true)
      return
    }

    // Create enemy group
    const enemies = createEnemyGroup(node.enemyGroupId)

    // Start combat
    combatStore.startCombat(partyStore.aliveCharacters, enemies)
  }
})
</script>
