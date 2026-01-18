// Character-related types

export interface Stats {
  str: number // Strength
  dex: number // Dexterity
  con: number // Constitution
  int: number // Intelligence
  wis: number // Wisdom
  cha: number // Charisma
}

export interface StatusEffect {
  id: string
  name: string
  type: 'buff' | 'debuff'
  duration: number // -1 for permanent
  stacks: number
  description: string
}

export interface Race {
  id: string
  name: string
  description: string
  passiveBonuses: {
    stats?: Partial<Stats>
    checkBonuses?: { type: string; bonus: number }[]
  }
  tags: string[] // For event options
}

export interface Class {
  id: string
  name: string
  description: string
  role: 'tank' | 'damage' | 'support' | 'control'
  startingCards: string[] // Card IDs
  passiveAbilities: string[]
}

export interface Profession {
  id: string
  name: string
  description: string
  craftingRecipes: string[]
  eventTags: string[] // Unlocks event options
}

export interface Character {
  id: string
  name: string

  race: Race
  class: Class
  profession: Profession

  level: number
  experience: number

  stats: Stats

  hp: number
  maxHp: number

  initiativeBonus: number

  // Card system
  deck: string[] // Card IDs in full deck
  drawPile: string[] // Cards to draw from
  discardPile: string[] // Used cards
  hand: string[] // Current hand

  inventory: string[] // Item IDs
  statusEffects: StatusEffect[]

  isDead: boolean
}

// Helper function to calculate stat modifier (D&D style)
export function getStatModifier(stat: number): number {
  return Math.floor((stat - 10) / 2)
}

// Helper function to calculate initiative
export function rollInitiative(character: Character): number {
  const dexMod = getStatModifier(character.stats.dex)
  return Math.floor(Math.random() * 20) + 1 + dexMod + character.initiativeBonus
}
