// Enemy definitions

import type { Enemy, EnemyAbility } from '~/types'

// Common abilities
const ABILITIES: Record<string, EnemyAbility> = {
  strike: {
    id: 'strike',
    name: 'Strike',
    description: 'Deal 8 damage',
    cooldown: 0,
    currentCooldown: 0,
    targetType: 'single',
    effects: [{ type: 'damage', value: 8 }],
    intent: 'attack'
  },

  heavy_strike: {
    id: 'heavy_strike',
    name: 'Heavy Strike',
    description: 'Deal 15 damage',
    cooldown: 1,
    currentCooldown: 0,
    targetType: 'single',
    effects: [{ type: 'damage', value: 15 }],
    intent: 'attack'
  },

  slash: {
    id: 'slash',
    name: 'Slash',
    description: 'Deal 6 damage twice',
    cooldown: 1,
    currentCooldown: 0,
    targetType: 'single',
    effects: [
      { type: 'damage', value: 6 },
      { type: 'damage', value: 6 }
    ],
    intent: 'attack'
  },

  cleave: {
    id: 'cleave',
    name: 'Cleave',
    description: 'Deal 10 damage to all',
    cooldown: 2,
    currentCooldown: 0,
    targetType: 'all',
    effects: [{ type: 'damage', value: 10 }],
    intent: 'attack'
  },

  defend: {
    id: 'defend',
    name: 'Defend',
    description: 'Gain defensive stance',
    cooldown: 2,
    currentCooldown: 0,
    targetType: 'single',
    effects: [
      { type: 'buff', statusEffect: { id: 'block', duration: 1, stacks: 5 } }
    ],
    intent: 'defend'
  },

  poison_bite: {
    id: 'poison_bite',
    name: 'Poison Bite',
    description: 'Deal 5 damage and apply poison',
    cooldown: 1,
    currentCooldown: 0,
    targetType: 'single',
    effects: [
      { type: 'damage', value: 5 },
      { type: 'debuff', statusEffect: { id: 'poison', duration: 3, stacks: 2 } }
    ],
    intent: 'debuff'
  },

  heal: {
    id: 'heal',
    name: 'Heal',
    description: 'Restore 10 HP',
    cooldown: 3,
    currentCooldown: 0,
    targetType: 'single',
    effects: [{ type: 'heal', value: 10 }],
    intent: 'buff'
  },

  rage: {
    id: 'rage',
    name: 'Rage',
    description: 'Gain strength',
    cooldown: 3,
    currentCooldown: 0,
    targetType: 'single',
    effects: [
      { type: 'buff', statusEffect: { id: 'strength', duration: 2, stacks: 3 } }
    ],
    intent: 'buff'
  }
}

// Enemy templates
export const ENEMIES: Record<string, Omit<Enemy, 'id' | 'hp' | 'isDead' | 'statusEffects' | 'abilities'> & { baseAbilities: string[] }> = {
  goblin: {
    name: 'Goblin',
    description: 'A weak but cunning creature',
    maxHp: 30,
    initiativeBonus: 2,
    baseAbilities: ['strike', 'poison_bite'],
    goldDrop: { min: 5, max: 15 },
    itemDrops: [],
    isBoss: false
  },

  orc: {
    name: 'Orc Warrior',
    description: 'A brutal fighter',
    maxHp: 50,
    initiativeBonus: 0,
    baseAbilities: ['strike', 'heavy_strike', 'rage'],
    goldDrop: { min: 10, max: 25 },
    itemDrops: [],
    isBoss: false
  },

  skeleton: {
    name: 'Skeleton',
    description: 'Undead warrior',
    maxHp: 35,
    initiativeBonus: 1,
    baseAbilities: ['strike', 'slash'],
    goldDrop: { min: 8, max: 18 },
    itemDrops: [],
    isBoss: false
  },

  dark_cultist: {
    name: 'Dark Cultist',
    description: 'Servant of darkness',
    maxHp: 40,
    initiativeBonus: 1,
    baseAbilities: ['strike', 'heal', 'poison_bite'],
    goldDrop: { min: 12, max: 22 },
    itemDrops: [],
    isBoss: false
  },

  dire_wolf: {
    name: 'Dire Wolf',
    description: 'A ferocious predator',
    maxHp: 45,
    initiativeBonus: 3,
    baseAbilities: ['slash', 'poison_bite'],
    goldDrop: { min: 10, max: 20 },
    itemDrops: [],
    isBoss: false
  },

  // Elite enemies
  orc_champion: {
    name: 'Orc Champion',
    description: 'Elite orc warrior',
    maxHp: 80,
    initiativeBonus: 1,
    baseAbilities: ['heavy_strike', 'cleave', 'rage', 'defend'],
    goldDrop: { min: 30, max: 50 },
    itemDrops: [],
    isBoss: false
  },

  dark_mage: {
    name: 'Dark Mage',
    description: 'Powerful spellcaster',
    maxHp: 70,
    initiativeBonus: 2,
    baseAbilities: ['strike', 'cleave', 'heal'],
    goldDrop: { min: 35, max: 55 },
    itemDrops: [],
    isBoss: false
  },

  // Boss
  goblin_king: {
    name: 'Goblin King',
    description: 'Ruler of the goblin tribe',
    maxHp: 150,
    initiativeBonus: 2,
    baseAbilities: ['strike', 'heavy_strike', 'cleave', 'poison_bite', 'rage'],
    goldDrop: { min: 100, max: 150 },
    itemDrops: [],
    isBoss: true
  }
}

// Create enemy instance
export function createEnemy(templateId: string, instanceId: string): Enemy {
  const template = ENEMIES[templateId]
  if (!template) {
    throw new Error(`Enemy template ${templateId} not found`)
  }

  const abilities = template.baseAbilities.map(abilityId => {
    const ability = ABILITIES[abilityId]
    if (!ability) {
      throw new Error(`Ability ${abilityId} not found`)
    }
    return { ...ability, currentCooldown: 0 }
  })

  return {
    id: instanceId,
    name: template.name,
    description: template.description,
    hp: template.maxHp,
    maxHp: template.maxHp,
    initiativeBonus: template.initiativeBonus,
    abilities,
    statusEffects: [],
    goldDrop: template.goldDrop,
    itemDrops: template.itemDrops,
    isDead: false,
    isBoss: template.isBoss
  }
}

// Create enemy group
export function createEnemyGroup(groupId: string): Enemy[] {
  // Parse group ID (e.g., "group_combat_5")
  const parts = groupId.split('_')
  const difficulty = parts[1] // combat, elite_combat, or boss

  if (difficulty === 'boss') {
    return [createEnemy('goblin_king', `${groupId}_boss1`)]
  }

  if (difficulty === 'elite_combat' || difficulty === 'elite') {
    // 1-2 elite enemies
    const count = Math.random() > 0.5 ? 1 : 2
    const elites = ['orc_champion', 'dark_mage']
    const enemies: Enemy[] = []

    for (let i = 0; i < count; i++) {
      const template = elites[Math.floor(Math.random() * elites.length)]
      enemies.push(createEnemy(template, `${groupId}_enemy${i}`))
    }

    return enemies
  }

  // Normal combat - 2-4 enemies
  const count = Math.floor(Math.random() * 3) + 2 // 2-4
  const normalEnemies = ['goblin', 'orc', 'skeleton', 'dark_cultist', 'dire_wolf']
  const enemies: Enemy[] = []

  for (let i = 0; i < count; i++) {
    const template = normalEnemies[Math.floor(Math.random() * normalEnemies.length)]
    enemies.push(createEnemy(template, `${groupId}_enemy${i}`))
  }

  return enemies
}

export function getAllEnemyTemplates() {
  return Object.keys(ENEMIES)
}
