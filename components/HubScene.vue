<template>
  <div class="h-screen flex flex-col bg-slate-900/50 backdrop-blur-sm">
    <!-- Header -->
    <div class="p-6 border-b border-slate-700">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">The Hub</h1>
        <div class="flex gap-6 text-lg">
          <div class="flex items-center gap-2">
            <span class="text-yellow-400">●</span>
            <span>{{ partyStore.gold }} Gold</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-blue-400">●</span>
            <span>{{ partyStore.supplies }} Supplies</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex">
      <!-- Left Menu -->
      <div class="w-64 border-r border-slate-700 p-4 space-y-2">
        <button
          @click="activeTab = 'party'"
          :class="[activeTab === 'party' ? 'btn-primary' : 'btn-secondary', 'w-full']"
        >
          Party
        </button>
        <button
          @click="activeTab = 'contracts'"
          :class="[activeTab === 'contracts' ? 'btn-primary' : 'btn-secondary', 'w-full']"
        >
          Contracts
        </button>
        <button
          @click="activeTab = 'shop'"
          :class="[activeTab === 'shop' ? 'btn-primary' : 'btn-secondary', 'w-full']"
        >
          Shop
        </button>
        <button
          @click="activeTab = 'craft'"
          :class="[activeTab === 'craft' ? 'btn-primary' : 'btn-secondary', 'w-full']"
        >
          Craft
        </button>
        <button
          @click="activeTab = 'lore'"
          :class="[activeTab === 'lore' ? 'btn-primary' : 'btn-secondary', 'w-full']"
        >
          Lore Archive
        </button>

        <div class="pt-4 border-t border-slate-700">
          <button
            @click="enterDungeon"
            class="btn-primary w-full py-3 glow-effect"
            :disabled="partyStore.aliveCharacters.length === 0"
          >
            Enter Dungeon
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 p-6 overflow-y-auto">
        <!-- Party Tab -->
        <div v-if="activeTab === 'party'" class="space-y-4">
          <h2 class="text-2xl font-bold mb-4">Your Party</h2>

          <div v-if="partyStore.characters.length === 0" class="text-center py-12">
            <p class="text-slate-400 mb-4">No characters in your party</p>
            <button @click="createParty" class="btn-primary">
              Create Party
            </button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CharacterCard
              v-for="character in partyStore.characters"
              :key="character.id"
              :character="character"
            />
          </div>
        </div>

        <!-- Contracts Tab -->
        <div v-else-if="activeTab === 'contracts'" class="space-y-4">
          <h2 class="text-2xl font-bold mb-4">Contracts</h2>
          <p class="text-slate-400">Contract system coming soon...</p>
        </div>

        <!-- Shop Tab -->
        <div v-else-if="activeTab === 'shop'" class="space-y-4">
          <h2 class="text-2xl font-bold mb-4">Shop</h2>
          <p class="text-slate-400">Shop system coming soon...</p>
        </div>

        <!-- Craft Tab -->
        <div v-else-if="activeTab === 'craft'" class="space-y-4">
          <h2 class="text-2xl font-bold mb-4">Crafting</h2>
          <p class="text-slate-400">Crafting system coming soon...</p>
        </div>

        <!-- Lore Tab -->
        <div v-else-if="activeTab === 'lore'" class="space-y-4">
          <h2 class="text-2xl font-bold mb-4">Lore Archive</h2>
          <p class="text-slate-400">Lore archive coming soon...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePartyStore } from '~/stores/party'
import { useHubStore } from '~/stores/hub'
import { saveGame } from '~/utils/saveLoad'
import type { Character, Race, Class, Profession } from '~/types'
import { RACES, CLASSES, PROFESSIONS } from '~/data'

const emit = defineEmits<{
  (e: 'enter-dungeon'): void
}>()

const partyStore = usePartyStore()
const hubStore = useHubStore()
const activeTab = ref('party')

// Auto-save when leaving hub
function enterDungeon() {
  if (partyStore.aliveCharacters.length > 0) {
    saveGame()
    emit('enter-dungeon')
  }
}

// Auto-save periodically
onMounted(() => {
  const saveInterval = setInterval(() => {
    saveGame()
  }, 30000) // Save every 30 seconds

  onUnmounted(() => {
    clearInterval(saveInterval)
    saveGame() // Final save on unmount
  })
})


function createParty() {
  // Create a default party for testing
  const testParty: Character[] = [
    createTestCharacter('Warrior', 'warrior', 'human', 'blacksmith'),
    createTestCharacter('Rogue', 'rogue', 'elf', 'alchemist'),
    createTestCharacter('Cleric', 'cleric', 'dwarf', 'scholar'),
    createTestCharacter('Wizard', 'wizard', 'halfling', 'ranger')
  ]

  partyStore.initializeParty(testParty)
}

function createTestCharacter(
  name: string,
  classId: string,
  raceId: string,
  professionId: string
): Character {
  const race = RACES[raceId]
  const charClass = CLASSES[classId]
  const profession = PROFESSIONS[professionId]

  return {
    id: `char_${Math.random().toString(36).substr(2, 9)}`,
    name,
    race,
    class: charClass,
    profession,
    level: 1,
    experience: 0,
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    },
    hp: 50,
    maxHp: 50,
    initiativeBonus: 0,
    deck: [...charClass.startingCards],
    drawPile: [...charClass.startingCards],
    discardPile: [],
    hand: [],
    inventory: [],
    statusEffects: [],
    isDead: false
  }
}

onMounted(() => {
  // Auto-create party if empty
  if (partyStore.characters.length === 0) {
    createParty()
  }
})
</script>
