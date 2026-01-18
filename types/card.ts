// Card system types

export type CardType = 'attack' | 'defense' | 'support' | 'control' | 'reaction' | 'passive'

export type TargetType = 'self' | 'single_ally' | 'all_allies' | 'single_enemy' | 'all_enemies' | 'any'

export interface CardEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'draw' | 'block' | 'special'
  value?: number // Base value
  statScaling?: {
    stat: keyof import('./character').Stats
    multiplier: number
  }
  statusEffect?: {
    id: string
    duration: number
    stacks: number
  }
  description: string
}

export interface Card {
  id: string
  name: string
  type: CardType
  description: string

  energyCost: number // Cost to play

  targetType: TargetType
  effects: CardEffect[]

  // Upgrade system
  upgradeLevel: number // 0 = base, 1+ = upgraded
  maxUpgradeLevel: number
  upgradeGoldCost: number

  // Card metadata
  classRestriction?: string // Class ID or null for universal
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

  // Tags for filtering and mechanics
  tags: string[]
}

export interface CardInHand extends Card {
  instanceId: string // Unique instance ID for this card in play
  characterId: string // Which character has this card
}
