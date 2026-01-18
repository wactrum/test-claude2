// General game types

export type Difficulty = 'easy' | 'normal' | 'hard'

export interface DifficultyModifiers {
  dcModifier: number // Added to all skill check DCs
  damageMultiplier: number // Multiplier for enemy damage
  rewardMultiplier: number // Multiplier for rewards
}

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultyModifiers> = {
  easy: {
    dcModifier: -2,
    damageMultiplier: 0.7,
    rewardMultiplier: 1.2
  },
  normal: {
    dcModifier: 0,
    damageMultiplier: 1.0,
    rewardMultiplier: 1.0
  },
  hard: {
    dcModifier: 2,
    damageMultiplier: 1.3,
    rewardMultiplier: 1.0
  }
}

export interface Contract {
  id: string
  title: string
  description: string

  // Requirements to complete
  requirements: {
    type: 'visit_nodes' | 'defeat_enemies' | 'collect_items' | 'reach_floor'
    nodeTypes?: string[]
    enemyTypes?: string[]
    itemIds?: string[]
    count?: number
    floor?: number
  }[]

  // Rewards
  goldReward: number
  itemRewards?: string[]

  // State
  progress: number
  maxProgress: number
  completed: boolean
  claimed: boolean
}

export interface Item {
  id: string
  name: string
  description: string
  type: 'consumable' | 'equipment' | 'material' | 'special'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

  // Effects
  effects?: {
    type: 'heal' | 'buff' | 'combat_boost' | 'revive'
    value?: number
    duration?: number
  }[]

  // Metadata
  stackable: boolean
  maxStack?: number
  sellValue: number
}

export interface ShopItem {
  itemId: string
  price: number
  stock: number // -1 for unlimited
}

export interface CraftingRecipe {
  id: string
  name: string
  description: string

  // Requirements
  requiredProfession?: string
  materials: { itemId: string; quantity: number }[]
  goldCost: number

  // Output
  resultItemId: string
  resultQuantity: number
}

export interface GameProgress {
  totalRunsCompleted: number
  totalDeaths: number
  highestFloor: number
  bossesDefeated: string[]
  eventsCompleted: string[]
  loreUnlocked: string[]
}
