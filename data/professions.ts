// Profession definitions

import type { Profession } from '~/types'

export const PROFESSIONS: Record<string, Profession> = {
  blacksmith: {
    id: 'blacksmith',
    name: 'Blacksmith',
    description: 'Crafts weapons and armor, repairs equipment.',
    craftingRecipes: [
      'iron_sword',
      'steel_armor',
      'reinforced_shield',
      'weapon_upgrade',
      'armor_patch'
    ],
    eventTags: ['blacksmith', 'metalwork', 'repair', 'forge']
  },

  alchemist: {
    id: 'alchemist',
    name: 'Alchemist',
    description: 'Brews potions and elixirs, identifies mysterious substances.',
    craftingRecipes: [
      'healing_potion',
      'strength_elixir',
      'antidote',
      'explosive_flask',
      'mana_potion'
    ],
    eventTags: ['alchemist', 'brewing', 'chemicals', 'poison', 'medicine']
  },

  scholar: {
    id: 'scholar',
    name: 'Scholar',
    description: 'Researches ancient texts, deciphers runes and magical artifacts.',
    craftingRecipes: [
      'scroll_of_power',
      'knowledge_tome',
      'rune_stone',
      'ancient_map',
      'translation_guide'
    ],
    eventTags: ['scholar', 'research', 'ancient', 'runes', 'lore', 'books']
  },

  ranger: {
    id: 'ranger',
    name: 'Ranger',
    description: 'Tracks creatures, gathers resources from nature, navigates wilderness.',
    craftingRecipes: [
      'herbal_remedy',
      'trap_kit',
      'survival_pack',
      'poisoned_arrows',
      'animal_companion_whistle'
    ],
    eventTags: ['ranger', 'tracking', 'nature', 'wilderness', 'survival', 'animals']
  }
}

// Helper to get profession by ID
export function getProfession(id: string): Profession | undefined {
  return PROFESSIONS[id]
}

// Get all professions as array
export function getAllProfessions(): Profession[] {
  return Object.values(PROFESSIONS)
}
