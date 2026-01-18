// Race definitions

import type { Race } from '~/types'

export const RACES: Record<string, Race> = {
  human: {
    id: 'human',
    name: 'Human',
    description: 'Versatile and adaptable, humans excel at any role they choose.',
    passiveBonuses: {
      stats: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
      checkBonuses: [
        { type: 'persuasion', bonus: 2 }
      ]
    },
    tags: ['human', 'versatile', 'diplomatic']
  },

  elf: {
    id: 'elf',
    name: 'Elf',
    description: 'Graceful and perceptive, elves are masters of finesse and magic.',
    passiveBonuses: {
      stats: { dex: 2, int: 1, wis: 1 },
      checkBonuses: [
        { type: 'perception', bonus: 3 },
        { type: 'arcana', bonus: 2 }
      ]
    },
    tags: ['elf', 'agile', 'magical', 'perceptive']
  },

  dwarf: {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Sturdy and resilient, dwarves are tough as the mountains they call home.',
    passiveBonuses: {
      stats: { con: 2, str: 1, wis: 1 },
      checkBonuses: [
        { type: 'constitution_save', bonus: 2 },
        { type: 'crafting', bonus: 3 }
      ]
    },
    tags: ['dwarf', 'sturdy', 'craftsman', 'resilient']
  },

  halfling: {
    id: 'halfling',
    name: 'Halfling',
    description: 'Lucky and quick, halflings are surprisingly hard to pin down.',
    passiveBonuses: {
      stats: { dex: 2, cha: 1 },
      checkBonuses: [
        { type: 'stealth', bonus: 3 },
        { type: 'luck', bonus: 2 }
      ]
    },
    tags: ['halfling', 'lucky', 'nimble', 'stealthy']
  }
}

// Helper to get race by ID
export function getRace(id: string): Race | undefined {
  return RACES[id]
}

// Get all races as array
export function getAllRaces(): Race[] {
  return Object.values(RACES)
}
