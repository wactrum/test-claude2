// Combat system types

import type { Character, StatusEffect } from './character'

export interface Enemy {
  id: string
  name: string
  description: string

  hp: number
  maxHp: number

  initiativeBonus: number

  abilities: EnemyAbility[]
  statusEffects: StatusEffect[]

  // Loot
  goldDrop: { min: number; max: number }
  itemDrops: { itemId: string; chance: number }[]

  isDead: boolean
  isBoss: boolean

  // AI behavior
  aiPattern?: string // Pattern ID for ability usage
}

export interface EnemyAbility {
  id: string
  name: string
  description: string

  cooldown: number
  currentCooldown: number

  targetType: 'single' | 'all' | 'random'
  effects: {
    type: 'damage' | 'buff' | 'debuff' | 'heal' | 'special'
    value?: number
    statusEffect?: {
      id: string
      duration: number
      stacks: number
    }
  }[]

  // Visual hint for player
  intent: 'attack' | 'defend' | 'buff' | 'debuff' | 'special'
}

export interface CombatEntity {
  type: 'character' | 'enemy'
  entity: Character | Enemy
  initiative: number
  energy: number // Energy per turn (for characters)
  maxEnergy: number
}

export interface CombatState {
  isActive: boolean
  turnNumber: number

  characters: Character[]
  enemies: Enemy[]

  turnOrder: CombatEntity[]
  currentEntityIndex: number

  rewards?: {
    gold: number
    experience: number
    items: string[]
  }

  victory: boolean
  defeat: boolean
}

export interface CombatAction {
  type: 'play_card' | 'end_turn' | 'use_ability'
  actorId: string
  targetId?: string
  cardId?: string
  abilityId?: string
}
