// Card definitions

import type { Card } from '~/types'

export const CARDS: Record<string, Card> = {
  // === WARRIOR CARDS ===
  strike: {
    id: 'strike',
    name: 'Strike',
    type: 'attack',
    description: 'Deal 6 damage.',
    energyCost: 1,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 6,
        statScaling: { stat: 'str', multiplier: 0.5 },
        description: 'Deal damage'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'warrior',
    rarity: 'common',
    tags: ['attack', 'physical']
  },

  defend: {
    id: 'defend',
    name: 'Defend',
    type: 'defense',
    description: 'Gain 5 block.',
    energyCost: 1,
    targetType: 'self',
    effects: [
      {
        type: 'block',
        value: 5,
        description: 'Gain block'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'warrior',
    rarity: 'common',
    tags: ['defense', 'block']
  },

  shield_bash: {
    id: 'shield_bash',
    name: 'Shield Bash',
    type: 'attack',
    description: 'Deal 4 damage and apply 1 stack of Stun.',
    energyCost: 1,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 4,
        description: 'Deal damage'
      },
      {
        type: 'debuff',
        statusEffect: { id: 'stun', duration: 1, stacks: 1 },
        description: 'Stun enemy'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 75,
    classRestriction: 'warrior',
    rarity: 'uncommon',
    tags: ['attack', 'control', 'stun']
  },

  taunt: {
    id: 'taunt',
    name: 'Taunt',
    type: 'control',
    description: 'Force enemy to attack you. Gain 3 block.',
    energyCost: 1,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'debuff',
        statusEffect: { id: 'taunted', duration: 1, stacks: 1 },
        description: 'Taunt enemy'
      },
      {
        type: 'block',
        value: 3,
        description: 'Gain block'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 60,
    classRestriction: 'warrior',
    rarity: 'common',
    tags: ['control', 'taunt', 'defense']
  },

  cleave: {
    id: 'cleave',
    name: 'Cleave',
    type: 'attack',
    description: 'Deal 8 damage to ALL enemies.',
    energyCost: 2,
    targetType: 'all_enemies',
    effects: [
      {
        type: 'damage',
        value: 8,
        statScaling: { stat: 'str', multiplier: 0.3 },
        description: 'Deal damage to all'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 100,
    classRestriction: 'warrior',
    rarity: 'rare',
    tags: ['attack', 'aoe']
  },

  battle_cry: {
    id: 'battle_cry',
    name: 'Battle Cry',
    type: 'support',
    description: 'Give all allies +2 Strength for 2 turns.',
    energyCost: 1,
    targetType: 'all_allies',
    effects: [
      {
        type: 'buff',
        statusEffect: { id: 'strength', duration: 2, stacks: 2 },
        description: 'Increase strength'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 80,
    classRestriction: 'warrior',
    rarity: 'uncommon',
    tags: ['support', 'buff']
  },

  iron_will: {
    id: 'iron_will',
    name: 'Iron Will',
    type: 'defense',
    description: 'Gain 8 block and remove 1 debuff.',
    energyCost: 2,
    targetType: 'self',
    effects: [
      {
        type: 'block',
        value: 8,
        description: 'Gain block'
      },
      {
        type: 'special',
        description: 'Remove debuff'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 90,
    classRestriction: 'warrior',
    rarity: 'uncommon',
    tags: ['defense', 'cleanse']
  },

  heavy_blow: {
    id: 'heavy_blow',
    name: 'Heavy Blow',
    type: 'attack',
    description: 'Deal 15 damage. Lose 2 block.',
    energyCost: 2,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 15,
        statScaling: { stat: 'str', multiplier: 1.0 },
        description: 'Deal heavy damage'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 85,
    classRestriction: 'warrior',
    rarity: 'uncommon',
    tags: ['attack', 'risky']
  },

  // === ROGUE CARDS ===
  quick_strike: {
    id: 'quick_strike',
    name: 'Quick Strike',
    type: 'attack',
    description: 'Deal 4 damage quickly.',
    energyCost: 1,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 4,
        statScaling: { stat: 'dex', multiplier: 0.5 },
        description: 'Deal damage'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'rogue',
    rarity: 'common',
    tags: ['attack', 'fast']
  },

  evade: {
    id: 'evade',
    name: 'Evade',
    type: 'defense',
    description: 'Gain 4 block and draw 1 card.',
    energyCost: 1,
    targetType: 'self',
    effects: [
      {
        type: 'block',
        value: 4,
        description: 'Gain block'
      },
      {
        type: 'draw',
        value: 1,
        description: 'Draw card'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'rogue',
    rarity: 'common',
    tags: ['defense', 'draw']
  },

  backstab: {
    id: 'backstab',
    name: 'Backstab',
    type: 'attack',
    description: 'Deal 12 damage. Double damage if enemy is stunned.',
    energyCost: 2,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 12,
        statScaling: { stat: 'dex', multiplier: 1.0 },
        description: 'Deal damage (2x if stunned)'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 100,
    classRestriction: 'rogue',
    rarity: 'rare',
    tags: ['attack', 'finisher']
  },

  poison_blade: {
    id: 'poison_blade',
    name: 'Poison Blade',
    type: 'attack',
    description: 'Deal 3 damage and apply 2 poison.',
    energyCost: 1,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 3,
        description: 'Deal damage'
      },
      {
        type: 'debuff',
        statusEffect: { id: 'poison', duration: 3, stacks: 2 },
        description: 'Apply poison'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 75,
    classRestriction: 'rogue',
    rarity: 'uncommon',
    tags: ['attack', 'poison', 'dot']
  },

  shadow_step: {
    id: 'shadow_step',
    name: 'Shadow Step',
    type: 'support',
    description: 'Gain 2 block and next attack deals +3 damage.',
    energyCost: 0,
    targetType: 'self',
    effects: [
      {
        type: 'block',
        value: 2,
        description: 'Gain block'
      },
      {
        type: 'buff',
        statusEffect: { id: 'shadow_strike', duration: 1, stacks: 3 },
        description: 'Boost next attack'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 90,
    classRestriction: 'rogue',
    rarity: 'uncommon',
    tags: ['support', 'buff', 'combo']
  },

  smoke_bomb: {
    id: 'smoke_bomb',
    name: 'Smoke Bomb',
    type: 'control',
    description: 'All enemies miss their next attack.',
    energyCost: 2,
    targetType: 'all_enemies',
    effects: [
      {
        type: 'debuff',
        statusEffect: { id: 'blinded', duration: 1, stacks: 1 },
        description: 'Blind enemies'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 100,
    classRestriction: 'rogue',
    rarity: 'rare',
    tags: ['control', 'blind', 'defensive']
  },

  knife_throw: {
    id: 'knife_throw',
    name: 'Knife Throw',
    type: 'attack',
    description: 'Deal 7 damage to a random enemy.',
    energyCost: 1,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 7,
        statScaling: { stat: 'dex', multiplier: 0.4 },
        description: 'Deal damage'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 60,
    classRestriction: 'rogue',
    rarity: 'common',
    tags: ['attack', 'ranged']
  },

  preparation: {
    id: 'preparation',
    name: 'Preparation',
    type: 'support',
    description: 'Draw 2 cards and reduce their cost by 1.',
    energyCost: 1,
    targetType: 'self',
    effects: [
      {
        type: 'draw',
        value: 2,
        description: 'Draw cards'
      },
      {
        type: 'special',
        description: 'Reduce cost'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 120,
    classRestriction: 'rogue',
    rarity: 'rare',
    tags: ['support', 'draw', 'cost_reduction']
  },

  // === CLERIC CARDS ===
  heal: {
    id: 'heal',
    name: 'Heal',
    type: 'support',
    description: 'Restore 8 HP to target ally.',
    energyCost: 1,
    targetType: 'single_ally',
    effects: [
      {
        type: 'heal',
        value: 8,
        statScaling: { stat: 'wis', multiplier: 0.5 },
        description: 'Restore HP'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'cleric',
    rarity: 'common',
    tags: ['support', 'heal']
  },

  holy_shield: {
    id: 'holy_shield',
    name: 'Holy Shield',
    type: 'defense',
    description: 'Give ally 6 block.',
    energyCost: 1,
    targetType: 'single_ally',
    effects: [
      {
        type: 'block',
        value: 6,
        description: 'Grant block'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'cleric',
    rarity: 'common',
    tags: ['defense', 'support']
  },

  smite: {
    id: 'smite',
    name: 'Smite',
    type: 'attack',
    description: 'Deal 10 holy damage to an enemy.',
    energyCost: 2,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 10,
        statScaling: { stat: 'wis', multiplier: 0.8 },
        description: 'Deal holy damage'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 80,
    classRestriction: 'cleric',
    rarity: 'uncommon',
    tags: ['attack', 'holy']
  },

  blessing: {
    id: 'blessing',
    name: 'Blessing',
    type: 'support',
    description: 'Give ally +1 to all stats for 3 turns.',
    energyCost: 1,
    targetType: 'single_ally',
    effects: [
      {
        type: 'buff',
        statusEffect: { id: 'blessed', duration: 3, stacks: 1 },
        description: 'Bless ally'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 90,
    classRestriction: 'cleric',
    rarity: 'uncommon',
    tags: ['support', 'buff']
  },

  prayer: {
    id: 'prayer',
    name: 'Prayer',
    type: 'support',
    description: 'Heal all allies for 5 HP.',
    energyCost: 2,
    targetType: 'all_allies',
    effects: [
      {
        type: 'heal',
        value: 5,
        statScaling: { stat: 'wis', multiplier: 0.3 },
        description: 'Heal all allies'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 100,
    classRestriction: 'cleric',
    rarity: 'rare',
    tags: ['support', 'heal', 'aoe']
  },

  divine_light: {
    id: 'divine_light',
    name: 'Divine Light',
    type: 'attack',
    description: 'Deal 6 damage to all enemies.',
    energyCost: 2,
    targetType: 'all_enemies',
    effects: [
      {
        type: 'damage',
        value: 6,
        statScaling: { stat: 'wis', multiplier: 0.5 },
        description: 'Deal holy damage to all'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 100,
    classRestriction: 'cleric',
    rarity: 'rare',
    tags: ['attack', 'holy', 'aoe']
  },

  sanctuary: {
    id: 'sanctuary',
    name: 'Sanctuary',
    type: 'defense',
    description: 'Give all allies 4 block and remove debuffs.',
    energyCost: 2,
    targetType: 'all_allies',
    effects: [
      {
        type: 'block',
        value: 4,
        description: 'Grant block'
      },
      {
        type: 'special',
        description: 'Cleanse debuffs'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 120,
    classRestriction: 'cleric',
    rarity: 'rare',
    tags: ['defense', 'support', 'cleanse']
  },

  purify: {
    id: 'purify',
    name: 'Purify',
    type: 'support',
    description: 'Remove all debuffs from ally and heal 5 HP.',
    energyCost: 1,
    targetType: 'single_ally',
    effects: [
      {
        type: 'special',
        description: 'Remove debuffs'
      },
      {
        type: 'heal',
        value: 5,
        description: 'Restore HP'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 80,
    classRestriction: 'cleric',
    rarity: 'uncommon',
    tags: ['support', 'cleanse', 'heal']
  },

  // === WIZARD CARDS ===
  magic_missile: {
    id: 'magic_missile',
    name: 'Magic Missile',
    type: 'attack',
    description: 'Deal 7 magic damage.',
    energyCost: 1,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 7,
        statScaling: { stat: 'int', multiplier: 0.5 },
        description: 'Deal magic damage'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'wizard',
    rarity: 'common',
    tags: ['attack', 'magic']
  },

  mage_armor: {
    id: 'mage_armor',
    name: 'Mage Armor',
    type: 'defense',
    description: 'Gain 5 block.',
    energyCost: 1,
    targetType: 'self',
    effects: [
      {
        type: 'block',
        value: 5,
        description: 'Gain magical block'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 50,
    classRestriction: 'wizard',
    rarity: 'common',
    tags: ['defense', 'magic']
  },

  fireball: {
    id: 'fireball',
    name: 'Fireball',
    type: 'attack',
    description: 'Deal 12 fire damage to all enemies.',
    energyCost: 3,
    targetType: 'all_enemies',
    effects: [
      {
        type: 'damage',
        value: 12,
        statScaling: { stat: 'int', multiplier: 1.0 },
        description: 'Deal fire damage to all'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 150,
    classRestriction: 'wizard',
    rarity: 'rare',
    tags: ['attack', 'magic', 'aoe', 'fire']
  },

  ice_lance: {
    id: 'ice_lance',
    name: 'Ice Lance',
    type: 'attack',
    description: 'Deal 8 damage and apply 1 Frozen.',
    energyCost: 2,
    targetType: 'single_enemy',
    effects: [
      {
        type: 'damage',
        value: 8,
        statScaling: { stat: 'int', multiplier: 0.6 },
        description: 'Deal ice damage'
      },
      {
        type: 'debuff',
        statusEffect: { id: 'frozen', duration: 1, stacks: 1 },
        description: 'Freeze enemy'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 90,
    classRestriction: 'wizard',
    rarity: 'uncommon',
    tags: ['attack', 'magic', 'control', 'ice']
  },

  arcane_barrier: {
    id: 'arcane_barrier',
    name: 'Arcane Barrier',
    type: 'defense',
    description: 'Gain 10 block and reflect 2 damage.',
    energyCost: 2,
    targetType: 'self',
    effects: [
      {
        type: 'block',
        value: 10,
        description: 'Gain block'
      },
      {
        type: 'buff',
        statusEffect: { id: 'thorns', duration: 2, stacks: 2 },
        description: 'Reflect damage'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 100,
    classRestriction: 'wizard',
    rarity: 'uncommon',
    tags: ['defense', 'magic', 'reflect']
  },

  counterspell: {
    id: 'counterspell',
    name: 'Counterspell',
    type: 'reaction',
    description: 'Negate next enemy ability.',
    energyCost: 1,
    targetType: 'self',
    effects: [
      {
        type: 'buff',
        statusEffect: { id: 'counterspell', duration: 1, stacks: 1 },
        description: 'Counter next ability'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 110,
    classRestriction: 'wizard',
    rarity: 'rare',
    tags: ['reaction', 'magic', 'control']
  },

  time_warp: {
    id: 'time_warp',
    name: 'Time Warp',
    type: 'support',
    description: 'Draw 3 cards.',
    energyCost: 2,
    targetType: 'self',
    effects: [
      {
        type: 'draw',
        value: 3,
        description: 'Draw cards'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 100,
    classRestriction: 'wizard',
    rarity: 'uncommon',
    tags: ['support', 'draw', 'magic']
  },

  arcane_power: {
    id: 'arcane_power',
    name: 'Arcane Power',
    type: 'support',
    description: 'Next spell deals double damage.',
    energyCost: 1,
    targetType: 'self',
    effects: [
      {
        type: 'buff',
        statusEffect: { id: 'arcane_power', duration: 1, stacks: 1 },
        description: 'Empower next spell'
      }
    ],
    upgradeLevel: 0,
    maxUpgradeLevel: 2,
    upgradeGoldCost: 120,
    classRestriction: 'wizard',
    rarity: 'rare',
    tags: ['support', 'buff', 'magic']
  }
}

// Helper functions
export function getCard(id: string): Card | undefined {
  return CARDS[id]
}

export function getCardsByClass(classId: string): Card[] {
  return Object.values(CARDS).filter(card =>
    card.classRestriction === classId || !card.classRestriction
  )
}

export function getAllCards(): Card[] {
  return Object.values(CARDS)
}
