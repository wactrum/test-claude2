<template>
  <div class="h-screen flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-6">
    <div class="card-container p-8 max-w-2xl w-full">
      <h2 class="text-3xl font-bold mb-4">{{ currentEvent?.title || 'Event' }}</h2>

      <div v-if="currentPhase" class="space-y-6">
        <!-- Phase Text -->
        <p class="text-lg text-slate-300">{{ currentPhase.text }}</p>

        <!-- Skill Check Result -->
        <div v-if="checkResult" class="p-4 rounded-lg" :class="checkResult.success ? 'bg-green-900/30' : 'bg-red-900/30'">
          <p class="font-bold">{{ checkResult.success ? 'Success!' : 'Failed!' }}</p>
          <p class="text-sm">Rolled: {{ checkResult.roll }} + {{ checkResult.modifier }} = {{ checkResult.total }} (DC: {{ checkResult.dc }})</p>
        </div>

        <!-- Options -->
        <div class="space-y-3">
          <button
            v-for="option in currentPhase.options"
            :key="option.id"
            @click="selectOption(option)"
            class="btn-primary w-full text-left p-4 flex flex-col"
          >
            <span class="font-bold">{{ option.label }}</span>
            <span class="text-sm text-slate-300">{{ option.description }}</span>
            <span v-if="option.check" class="text-xs text-blue-400 mt-1">
              Requires: {{ option.check.stat.toUpperCase() }} check (DC {{ option.check.dc }})
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDungeonStore } from '~/stores/dungeon'
import { usePartyStore } from '~/stores/party'
import { useRunStore } from '~/stores/run'
import { DIFFICULTY_SETTINGS } from '~/types'
import { getEvent } from '~/data/events'
import type { Event, EventPhase, EventOption } from '~/types'

const emit = defineEmits<{
  (e: 'event-end'): void
}>()

const dungeonStore = useDungeonStore()
const partyStore = usePartyStore()
const runStore = useRunStore()

const currentEvent = ref<Event | null>(null)
const currentPhaseId = ref('')
const checkResult = ref<{
  success: boolean
  roll: number
  modifier: number
  total: number
  dc: number
} | null>(null)

const currentPhase = computed((): EventPhase | null => {
  if (!currentEvent.value) return null
  return currentEvent.value.phases.find(p => p.id === currentPhaseId.value) || null
})

function selectOption(option: EventOption) {
  checkResult.value = null

  // Handle skill check
  if (option.check) {
    // Pick random character to make the check
    const aliveChars = partyStore.aliveCharacters
    if (aliveChars.length === 0) {
      emit('event-end')
      return
    }

    const character = aliveChars[0] // Simplified - use first character

    // Get stat value (handle initiative separately)
    let statValue = 10
    if (option.check.stat === 'initiative') {
      statValue = character.stats.dex // Initiative uses dexterity
    } else {
      statValue = character.stats[option.check.stat]
    }

    const modifier = Math.floor((statValue - 10) / 2)
    const roll = Math.floor(Math.random() * 20) + 1

    // Apply difficulty modifier
    const diffMod = DIFFICULTY_SETTINGS[runStore.difficulty].dcModifier
    const adjustedDC = option.check.dc + diffMod

    const total = roll + modifier + (option.check.bonus || 0)
    const success = total >= adjustedDC

    checkResult.value = {
      success,
      roll,
      modifier,
      total,
      dc: adjustedDC
    }

    // Move to next phase based on success
    if (success && option.successPhaseId) {
      currentPhaseId.value = option.successPhaseId
    } else if (!success && option.failPhaseId) {
      currentPhaseId.value = option.failPhaseId
    } else {
      applyRewardsAndEnd(option)
    }
  } else {
    // No check, just move to next phase or end
    if (option.nextPhaseId) {
      currentPhaseId.value = option.nextPhaseId
    } else {
      applyRewardsAndEnd(option)
    }
  }
}

function applyRewardsAndEnd(option: EventOption) {
  // Apply rewards
  if (option.rewards) {
    if (option.rewards.gold) {
      partyStore.addGold(option.rewards.gold)
    }
    if (option.rewards.items) {
      option.rewards.items.forEach(itemId => partyStore.addItem(itemId))
    }
    if (option.rewards.heal) {
      // Heal all characters
      partyStore.characters.forEach(char => {
        partyStore.healCharacter(char.id, option.rewards!.heal!)
      })
    }
  }

  // Apply penalties
  if (option.penalties) {
    if (option.penalties.gold) {
      partyStore.removeGold(option.penalties.gold)
    }
    if (option.penalties.damage) {
      // Damage all characters
      partyStore.characters.forEach(char => {
        partyStore.damageCharacter(char.id, option.penalties!.damage!)
      })
    }
  }

  // End event
  setTimeout(() => {
    emit('event-end')
  }, 1000)
}

onMounted(() => {
  const node = dungeonStore.currentNode
  if (!node || !node.eventId) {
    emit('event-end')
    return
  }

  const event = getEvent(node.eventId)
  if (!event) {
    emit('event-end')
    return
  }

  currentEvent.value = event
  currentPhaseId.value = event.startPhaseId
})
</script>
