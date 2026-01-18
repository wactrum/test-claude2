<template>
  <div class="relative h-screen flex items-center justify-center overflow-hidden p-8">
    <!-- Background Image -->
    <div
      class="scene-bg"
      :style="`background-image: url('${getEventBackground()}')`"
    ></div>
    <div class="scene-overlay"></div>

    <div class="relative z-10 card-container-light p-10 max-w-3xl w-full">
      <h2 class="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200">
        {{ currentEvent?.title || 'Event' }}
      </h2>

      <div v-if="currentPhase" class="space-y-8">
        <!-- Phase Text -->
        <p class="text-xl text-slate-100 leading-relaxed">{{ currentPhase.text }}</p>

        <!-- Skill Check Result -->
        <div v-if="checkResult" class="p-6 rounded-xl border-2" :class="checkResult.success ? 'bg-green-900/40 border-green-500/50' : 'bg-red-900/40 border-red-500/50'">
          <p class="font-bold text-2xl mb-2">{{ checkResult.success ? 'Success!' : 'Failed!' }}</p>
          <p class="text-lg">Rolled: {{ checkResult.roll }} + {{ checkResult.modifier }} = {{ checkResult.total }} (DC: {{ checkResult.dc }})</p>
        </div>

        <!-- Options -->
        <div class="space-y-4">
          <button
            v-for="option in currentPhase.options"
            :key="option.id"
            @click="selectOption(option)"
            class="btn-primary w-full text-left p-6 flex flex-col hover:scale-102 transition-transform"
          >
            <span class="font-bold text-xl mb-2">{{ option.label }}</span>
            <span class="text-base text-slate-200">{{ option.description }}</span>
            <span v-if="option.check" class="text-sm text-blue-300 mt-2 font-semibold">
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

function getEventBackground(): string {
  // Cycle through different dungeon backgrounds for variety
  const backgrounds = [
    '/images/u4419938122_Dungeon_passage_of_a_warm_late-medieval_stone_d_bc4c2c9f-a321-47b7-8e95-9f60c69b81f9_3.png',
    '/images/u4419938122_Interior_warehouse_space_of_a_warm_late-medieva_4dda9fdf-4fe0-4aa5-b89f-3f60dd61b2cc_0.png',
    '/images/u4419938122_Dungeon_passage_of_a_warm_late-medieval_stone_d_bc4c2c9f-a321-47b7-8e95-9f60c69b81f9_0.png',
    '/images/u4419938122_Wide_stone_bridge_corridor_of_a_warm_late-medie_d54c2757-ccf2-4c56-93cc-fcdf8b3b5d2a_1.png'
  ]
  const index = currentEvent.value ? currentEvent.value.id.charCodeAt(0) % backgrounds.length : 0
  return backgrounds[index]
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
