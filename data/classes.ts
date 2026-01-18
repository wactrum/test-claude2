// Class definitions

import type { Class } from '~/types'

export const CLASSES: Record<string, Class> = {
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    description: 'A frontline fighter who excels at taking and dealing physical damage.',
    role: 'tank',
    startingCards: [
      'strike',
      'strike',
      'defend',
      'defend',
      'shield_bash',
      'taunt',
      'cleave',
      'battle_cry',
      'iron_will',
      'heavy_blow'
    ],
    passiveAbilities: ['armor_proficiency', 'second_wind']
  },

  rogue: {
    id: 'rogue',
    name: 'Rogue',
    description: 'A cunning striker who uses stealth and precision to eliminate targets.',
    role: 'damage',
    startingCards: [
      'quick_strike',
      'quick_strike',
      'evade',
      'evade',
      'backstab',
      'poison_blade',
      'shadow_step',
      'smoke_bomb',
      'knife_throw',
      'preparation'
    ],
    passiveAbilities: ['sneak_attack', 'evasion']
  },

  cleric: {
    id: 'cleric',
    name: 'Cleric',
    description: 'A divine supporter who heals allies and smites enemies with holy power.',
    role: 'support',
    startingCards: [
      'heal',
      'heal',
      'holy_shield',
      'holy_shield',
      'smite',
      'blessing',
      'prayer',
      'divine_light',
      'sanctuary',
      'purify'
    ],
    passiveAbilities: ['divine_intervention', 'healing_hands']
  },

  wizard: {
    id: 'wizard',
    name: 'Wizard',
    description: 'An arcane master who controls the battlefield with powerful spells.',
    role: 'control',
    startingCards: [
      'magic_missile',
      'magic_missile',
      'mage_armor',
      'mage_armor',
      'fireball',
      'ice_lance',
      'arcane_barrier',
      'counterspell',
      'time_warp',
      'arcane_power'
    ],
    passiveAbilities: ['spell_mastery', 'arcane_recovery']
  }
}

// Helper to get class by ID
export function getClass(id: string): Class | undefined {
  return CLASSES[id]
}

// Get all classes as array
export function getAllClasses(): Class[] {
  return Object.values(CLASSES)
}
