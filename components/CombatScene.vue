<template>
  <div class="h-screen flex flex-col bg-slate-900/50 backdrop-blur-sm">
    <!-- Combat Result Screen -->
    <div v-if="combatStore.isCombatOver" class="flex-1 flex items-center justify-center">
      <div class="card-container p-8 max-w-md text-center">
        <h2 class="text-4xl font-bold mb-4" :class="combatStore.victory ? 'text-green-500' : 'text-red-500'">
          {{ combatStore.victory ? 'Victory!' : 'Defeat' }}
        </h2>

        <div v-if="combatStore.victory && combatStore.rewards" class="space-y-4 mb-6">
          <div class="text-lg">
            <span class="text-yellow-400">+{{ combatStore.rewards.gold }}</span> Gold
          </div>
          <div class="text-lg">
            <span class="text-blue-400">+{{ combatStore.rewards.experience }}</span> XP
          </div>
        </div>

        <button @click="exitCombat" class="btn-primary w-full">
          Continue
        </button>
      </div>
    </div>

    <!-- Active Combat -->
    <div v-else class="flex-1 flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold">Turn {{ combatStore.turnNumber }}</h2>
          <p class="text-sm text-slate-400">
            {{ currentTurnEntity?.type === 'character' ? (currentTurnEntity.entity as Character).name + "'s Turn" : (currentTurnEntity?.entity as Enemy).name + "'s Turn" }}
          </p>
        </div>

        <div v-if="combatStore.isPlayerTurn && currentTurnEntity" class="flex gap-4">
          <div class="text-lg">
            Energy: <span class="text-blue-400">{{ currentTurnEntity.energy }}/{{ currentTurnEntity.maxEnergy }}</span>
          </div>
          <button @click="combatStore.endTurn()" class="btn-secondary">
            End Turn
          </button>
        </div>
      </div>

      <!-- Battle Area -->
      <div class="flex-1 overflow-auto p-6">
        <!-- Enemies -->
        <div class="mb-8">
          <h3 class="text-xl font-bold mb-4">Enemies</h3>
          <div class="flex gap-4 flex-wrap">
            <div
              v-for="enemy in combatStore.aliveEnemies"
              :key="enemy.id"
              class="card-container p-4 w-48 cursor-pointer"
              :class="{ 'ring-2 ring-red-500': selectedTarget === enemy.id }"
              @click="selectTarget(enemy.id)"
            >
              <h4 class="font-bold mb-2">{{ enemy.name }}</h4>
              <div class="mb-2">
                <div class="text-sm mb-1">HP: {{ enemy.hp }}/{{ enemy.maxHp }}</div>
                <div class="w-full bg-slate-700 rounded-full h-2">
                  <div class="bg-red-600 rounded-full h-2" :style="{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }"></div>
                </div>
              </div>
              <div v-if="enemy.statusEffects.length > 0" class="text-xs">
                <div v-for="effect in enemy.statusEffects" :key="effect.id" class="text-slate-400">
                  {{ effect.name }} ({{ effect.stacks }})
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Party -->
        <div>
          <h3 class="text-xl font-bold mb-4">Your Party</h3>
          <div class="flex gap-4 flex-wrap">
            <div
              v-for="char in combatStore.aliveCharacters"
              :key="char.id"
              class="card-container p-4 w-48"
              :class="{ 'ring-2 ring-blue-500': currentCharacterId === char.id }"
            >
              <h4 class="font-bold mb-2">{{ char.name }}</h4>
              <div class="mb-2">
                <div class="text-sm mb-1">HP: {{ char.hp }}/{{ char.maxHp }}</div>
                <div class="w-full bg-slate-700 rounded-full h-2">
                  <div class="bg-green-600 rounded-full h-2" :style="{ width: `${(char.hp / char.maxHp) * 100}%` }"></div>
                </div>
              </div>
              <div v-if="char.statusEffects.length > 0" class="text-xs">
                <div v-for="effect in char.statusEffects" :key="effect.id" class="text-slate-400">
                  {{ effect.name }} ({{ effect.stacks }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hand (only shown during player turn) -->
      <div v-if="combatStore.isPlayerTurn && currentCharacter" class="p-4 border-t border-slate-700 bg-slate-800/50">
        <h3 class="text-lg font-bold mb-3">Hand</h3>
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
