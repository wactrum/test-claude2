<template>
  <div class="relative h-screen flex flex-col overflow-hidden">
    <!-- Background Image -->
    <div
      class="scene-bg"
      style="background-image: url('/images/u4419938122_Warm_late-medieval_city_around_a_large_stone_chas_3f0ce0e3-7c84-4892-9950-f138f72c7ff6_0.png')"
    ></div>
    <div class="scene-overlay"></div>

    <!-- Header -->
    <div class="relative z-10 p-8 border-b border-amber-600/30 bg-slate-900/60 backdrop-blur-md">
      <div class="flex justify-between items-center">
        <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">The Hub</h1>
        <div class="flex gap-8 text-xl">
          <div class="flex items-center gap-3 px-6 py-3 bg-amber-950/50 rounded-xl border border-amber-600/30">
            <span class="text-amber-400 font-bold">◈</span>
            <span class="font-semibold text-amber-200">{{ partyStore.gold }} Gold</span>
          </div>
          <div class="flex items-center gap-3 px-6 py-3 bg-blue-950/50 rounded-xl border border-blue-600/30">
            <span class="text-blue-400 font-bold">▪</span>
            <span class="font-semibold text-blue-200">{{ partyStore.supplies }} Supplies</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex-1 flex">
      <!-- Left Menu -->
      <div class="w-80 border-r border-amber-600/20 p-6 space-y-3 bg-slate-900/40 backdrop-blur-sm">
        <button
          @click="activeTab = 'party'"
          :class="[activeTab === 'party' ? 'btn-primary' : 'btn-secondary', 'w-full py-4 text-lg']"
        >
          Party
        </button>
        <button
          @click="activeTab = 'contracts'"
          :class="[activeTab === 'contracts' ? 'btn-primary' : 'btn-secondary', 'w-full py-4 text-lg']"
        >
          Contracts
        </button>
        <button
          @click="activeTab = 'shop'"
          :class="[activeTab === 'shop' ? 'btn-primary' : 'btn-secondary', 'w-full py-4 text-lg']"
        >
          Shop
        </button>
        <button
          @click="activeTab = 'craft'"
          :class="[activeTab === 'craft' ? 'btn-primary' : 'btn-secondary', 'w-full py-4 text-lg']"
        >
          Craft
        </button>
        <button
          @click="activeTab = 'lore'"
          :class="[activeTab === 'lore' ? 'btn-primary' : 'btn-secondary', 'w-full py-4 text-lg']"
        >
          Lore Archive
        </button>

        <div class="pt-6 border-t border-amber-600/30">
          <button
            @click="enterDungeon"
            class="btn-primary w-full py-5 text-xl glow-effect"
            :disabled="partyStore.aliveCharacters.length === 0"
          >
            Enter Dungeon
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 p-8 overflow-y-auto bg-slate-900/20 backdrop-blur-sm">
        <!-- Party Tab -->
        <div v-if="activeTab === 'party'" class="space-y-6">
          <h2 class="text-4xl font-bold mb-6 text-slate-100">Your Party</h2>

          <div v-if="partyStore.characters.length === 0" class="text-center py-16">
            <p class="text-slate-300 text-xl mb-6">No characters in your party</p>
            <button @click="createParty" class="btn-primary py-4 px-8 text-lg">
              Create Party
            </button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CharacterCard
              v-for="character in partyStore.characters"
              :key="character.id"
              :character="character"
            />
          </div>
        </div>

        <!-- Contracts Tab -->
        <div v-else-if="activeTab === 'contracts'" class="space-y-6">
          <h2 class="text-4xl font-bold mb-6 text-slate-100">Contracts</h2>
          <p class="text-lg text-slate-300 mb-6">Accept contracts to earn rewards. Max 2 active.</p>

          <div class="space-y-4">
            <div class="card-container-light p-6">
              <h3 class="font-bold text-xl mb-3">Clear the Goblin Den</h3>
              <p class="text-base text-slate-300 mb-4">Defeat 10 goblins</p>
              <div class="flex justify-between items-center">
                <span class="text-amber-400 text-lg font-semibold">Reward: 100 Gold</span>
                <button class="btn-primary px-6 py-3">Accept</button>
              </div>
            </div>

            <div class="card-container-light p-6">
              <h3 class="font-bold text-xl mb-3">Explore Deep</h3>
              <p class="text-base text-slate-300 mb-4">Reach floor 3</p>
              <div class="flex justify-between items-center">
                <span class="text-amber-400 text-lg font-semibold">Reward: 150 Gold</span>
                <button class="btn-primary px-6 py-3">Accept</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Shop Tab -->
        <div v-else-if="activeTab === 'shop'" class="space-y-6">
          <h2 class="text-4xl font-bold mb-6 text-slate-100">Shop</h2>
          <p class="text-lg text-slate-300 mb-6">Buy cards and items with gold</p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="card-container-light p-6">
              <h3 class="font-bold text-lg mb-3">Healing Potion</h3>
              <p class="text-base text-slate-300 mb-4">Restore 30 HP</p>
              <div class="flex justify-between items-center">
                <span class="text-amber-400 font-semibold">20 Gold</span>
                <button class="btn-primary px-4 py-2">Buy</button>
              </div>
            </div>

            <div class="card-container-light p-6">
              <h3 class="font-bold text-lg mb-3">Power Strike Card</h3>
              <p class="text-base text-slate-300 mb-4">Deal 15 damage</p>
              <div class="flex justify-between items-center">
                <span class="text-amber-400 font-semibold">75 Gold</span>
                <button class="btn-primary px-4 py-2">Buy</button>
              </div>
            </div>

            <div class="card-container-light p-6">
              <h3 class="font-bold text-lg mb-3">Supplies Pack</h3>
              <p class="text-base text-slate-300 mb-4">+3 Supplies</p>
              <div class="flex justify-between items-center">
                <span class="text-amber-400 font-semibold">30 Gold</span>
                <button class="btn-primary px-4 py-2">Buy</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Craft Tab -->
        <div v-else-if="activeTab === 'craft'" class="space-y-6">
          <h2 class="text-4xl font-bold mb-6 text-slate-100">Crafting</h2>
          <p class="text-lg text-slate-300 mb-6">Craft items using materials and professions</p>

          <div class="space-y-4">
            <div class="card-container-light p-6">
              <h3 class="font-bold text-xl mb-3">Iron Sword</h3>
              <p class="text-base text-slate-300 mb-2">Requires: Blacksmith profession</p>
              <p class="text-base text-slate-200 mb-4">Materials: Iron Ore x2, Gold: 50</p>
              <button class="btn-primary px-4 py-2" disabled>
                Craft (Missing Materials)
              </button>
            </div>

            <div class="card-container-light p-6">
              <h3 class="font-bold text-xl mb-3">Health Elixir</h3>
              <p class="text-base text-slate-300 mb-2">Requires: Alchemist profession</p>
              <p class="text-base text-slate-200 mb-4">Materials: Herbs x3, Gold: 30</p>
              <button class="btn-primary px-4 py-2" disabled>
                Craft (Missing Materials)
              </button>
            </div>
          </div>
        </div>

        <!-- Lore Tab -->
        <div v-else-if="activeTab === 'lore'" class="space-y-6">
          <h2 class="text-4xl font-bold mb-6 text-slate-100">Lore Archive</h2>
          <p class="text-lg text-slate-300 mb-6">Discover the secrets of the dungeon</p>

          <div class="space-y-4">
            <div class="card-container-light p-6">
              <h3 class="font-bold text-xl mb-4">The Ancient Ruins</h3>
              <p class="text-lg text-slate-200 leading-relaxed">
                Long ago, these halls were home to a prosperous civilization.
                What caused their downfall remains a mystery...
              </p>
            </div>
          </div>
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
