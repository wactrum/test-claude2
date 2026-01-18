// Save/Load system using localStorage

import type { SaveFile } from '~/types'

const SAVE_KEY = 'card-roguelike-save'
const SAVE_VERSION = '1.0.0'

export async function saveGame() {
  const { usePartyStore } = await import('~/stores/party')
  const { useHubStore } = await import('~/stores/hub')
  const { useRunStore } = await import('~/stores/run')
  const { useDungeonStore } = await import('~/stores/dungeon')
  const { useGameStore } = await import('~/stores/game')

  const partyStore = usePartyStore()
  const hubStore = useHubStore()
  const runStore = useRunStore()
  const dungeonStore = useDungeonStore()
  const gameStore = useGameStore()

  const saveFile: SaveFile = {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    data: {
      party: {
        characters: partyStore.characters,
        gold: partyStore.gold,
        supplies: partyStore.supplies,
        sharedInventory: partyStore.sharedInventory
      },
      run: runStore.active ? {
        active: true,
        seed: runStore.seed,
        difficulty: runStore.difficulty,
        floor: runStore.currentFloor,
        dungeon: dungeonStore.map
      } : null,
      hub: {
        contracts: hubStore.activeContracts,
        shopInventory: hubStore.shopInventory.map(i => i.itemId),
        unlockedRecipes: hubStore.unlockedRecipes
      },
      progress: gameStore.progress
    }
  }

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveFile))
    return true
  } catch (error) {
    console.error('Failed to save game:', error)
    return false
  }
}

export async function loadGame(): Promise<boolean> {
  try {
    const saveData = localStorage.getItem(SAVE_KEY)
    if (!saveData) return false

    const saveFile: SaveFile = JSON.parse(saveData)

    // Version check
    if (saveFile.version !== SAVE_VERSION) {
      console.warn('Save file version mismatch')
      // Could implement migration here
    }

    const { usePartyStore } = await import('~/stores/party')
    const { useHubStore } = await import('~/stores/hub')
    const { useRunStore } = await import('~/stores/run')
    const { useDungeonStore } = await import('~/stores/dungeon')
    const { useGameStore } = await import('~/stores/game')

    const partyStore = usePartyStore()
    const hubStore = useHubStore()
    const runStore = useRunStore()
    const dungeonStore = useDungeonStore()
    const gameStore = useGameStore()

    // Load party
    partyStore.characters = saveFile.data.party.characters
    partyStore.gold = saveFile.data.party.gold
    partyStore.supplies = saveFile.data.party.supplies
    partyStore.sharedInventory = saveFile.data.party.sharedInventory

    // Load run
    if (saveFile.data.run) {
      runStore.active = saveFile.data.run.active
      runStore.seed = saveFile.data.run.seed
      runStore.difficulty = saveFile.data.run.difficulty as any
      runStore.currentFloor = saveFile.data.run.floor

      if (saveFile.data.run.dungeon) {
        dungeonStore.initializeDungeon(saveFile.data.run.dungeon)
      }
    }

    // Load hub
    hubStore.activeContracts = saveFile.data.hub.contracts
    hubStore.unlockedRecipes = saveFile.data.hub.unlockedRecipes

    // Load progress
    gameStore.progress = saveFile.data.progress

    return true
  } catch (error) {
    console.error('Failed to load game:', error)
    return false
  }
}

export function hasSaveFile(): boolean {
  return !!localStorage.getItem(SAVE_KEY)
}

export function deleteSaveFile(): void {
  localStorage.removeItem(SAVE_KEY)
}
