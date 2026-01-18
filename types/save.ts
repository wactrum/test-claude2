// Save/Load system types

import type { Character } from './character'
import type { DungeonMap } from './dungeon'
import type { Contract, GameProgress } from './game'

export interface SaveFile {
  version: string
  timestamp: number
  data: {
    // Party state
    party: {
      characters: Character[]
      gold: number
      supplies: number
      sharedInventory: string[]
    }

    // Run state (null if not in run)
    run: {
      active: boolean
      seed: string
      difficulty: string
      floor: number
      dungeon: DungeonMap | null
    } | null

    // Hub state
    hub: {
      contracts: Contract[]
      shopInventory: string[]
      unlockedRecipes: string[]
    }

    // Progress
    progress: GameProgress
  }
}

export interface SaveMetadata {
  slot: number
  timestamp: number
  partyLevel: number
  currentFloor: number
  playTime: number
}
