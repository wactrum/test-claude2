// Card effect application utilities

import type { Card, CardEffect, Character, Enemy } from '~/types'
import { getStatModifier } from '~/types'

export interface CombatTarget {
  type: 'character' | 'enemy'
  entity: Character | Enemy
}

export function applyCardEffects(
  card: Card,
  caster: Character,
  targets: CombatTarget[]
): void {
  card.effects.forEach(effect => {
    targets.forEach(target => {
      applyEffect(effect, caster, target)
    })
  })
}

function applyEffect(
  effect: CardEffect,
  caster: Character,
  target: CombatTarget
): void {
  switch (effect.type) {
    case 'damage':
      applyDamage(effect, caster, target)
      break

    case 'heal':
      applyHeal(effect, caster, target)
      break

    case 'buff':
      applyBuff(effect, target)
      break

    case 'debuff':
      applyDebuff(effect, target)
      break

    case 'block':
      applyBlock(effect, target)
      break

    case 'draw':
      applyDraw(effect, caster)
      break

    default:
      console.warn(`Unknown effect type: ${effect.type}`)
  }
}

function applyDamage(
  effect: CardEffect,
  caster: Character,
  target: CombatTarget
): void {
  let damage = effect.value || 0

  // Apply stat scaling
  if (effect.statScaling) {
    const statValue = caster.stats[effect.statScaling.stat]
    const statMod = getStatModifier(statValue)
    damage += Math.floor(statMod * effect.statScaling.multiplier)
  }

  // Apply damage to target
  if (target.entity) {
    target.entity.hp = Math.max(0, target.entity.hp - damage)

    // Check if entity died
    if (target.entity.hp === 0) {
      target.entity.isDead = true
    }
  }
}

function applyHeal(
  effect: CardEffect,
  caster: Character,
  target: CombatTarget
): void {
  let healing = effect.value || 0

  // Apply stat scaling
  if (effect.statScaling) {
    const statValue = caster.stats[effect.statScaling.stat]
    const statMod = getStatModifier(statValue)
    healing += Math.floor(statMod * effect.statScaling.multiplier)
  }

  // Apply healing to target
  if (target.type === 'character' && target.entity) {
    const character = target.entity as Character
    character.hp = Math.min(character.maxHp, character.hp + healing)
  } else if (target.type === 'enemy' && target.entity) {
    const enemy = target.entity as Enemy
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + healing)
  }
}

function applyBuff(effect: CardEffect, target: CombatTarget): void {
  if (!effect.statusEffect) return

  const existingEffect = target.entity.statusEffects.find(
    e => e.id === effect.statusEffect!.id
  )

  if (existingEffect) {
    // Stack or refresh
    existingEffect.stacks += effect.statusEffect.stacks
    existingEffect.duration = Math.max(
      existingEffect.duration,
      effect.statusEffect.duration
    )
  } else {
    // Add new effect
    target.entity.statusEffects.push({
      id: effect.statusEffect.id,
      name: effect.statusEffect.id,
      type: 'buff',
      duration: effect.statusEffect.duration,
      stacks: effect.statusEffect.stacks,
      description: effect.description
    })
  }
}

function applyDebuff(effect: CardEffect, target: CombatTarget): void {
  if (!effect.statusEffect) return

  const existingEffect = target.entity.statusEffects.find(
    e => e.id === effect.statusEffect!.id
  )

  if (existingEffect) {
    // Stack or refresh
    existingEffect.stacks += effect.statusEffect.stacks
    existingEffect.duration = Math.max(
      existingEffect.duration,
      effect.statusEffect.duration
    )
  } else {
    // Add new effect
    target.entity.statusEffects.push({
      id: effect.statusEffect.id,
      name: effect.statusEffect.id,
      type: 'debuff',
      duration: effect.statusEffect.duration,
      stacks: effect.statusEffect.stacks,
      description: effect.description
    })
  }
}

function applyBlock(effect: CardEffect, target: CombatTarget): void {
  // Block is typically a buff with stacks representing block amount
  const blockAmount = effect.value || 0

  const existingBlock = target.entity.statusEffects.find(e => e.id === 'block')

  if (existingBlock) {
    existingBlock.stacks += blockAmount
  } else {
    target.entity.statusEffects.push({
      id: 'block',
      name: 'Block',
      type: 'buff',
      duration: 1, // Block lasts until end of turn
      stacks: blockAmount,
      description: 'Reduces incoming damage'
    })
  }
}

function applyDraw(effect: CardEffect, caster: Character): void {
  // Drawing cards is handled by combat store
  // This is just a placeholder for the effect
  console.log(`Draw ${effect.value || 1} cards`)
}

// Helper to get all valid targets for a card
export function getValidTargets(
  card: Card,
  characters: Character[],
  enemies: Enemy[],
  caster: Character
): CombatTarget[] {
  const targets: CombatTarget[] = []

  switch (card.targetType) {
    case 'self':
      targets.push({ type: 'character', entity: caster })
      break

    case 'single_ally':
      characters
        .filter(c => !c.isDead)
        .forEach(c => targets.push({ type: 'character', entity: c }))
      break

    case 'all_allies':
      characters
        .filter(c => !c.isDead)
        .forEach(c => targets.push({ type: 'character', entity: c }))
      break

    case 'single_enemy':
      enemies
        .filter(e => !e.isDead)
        .forEach(e => targets.push({ type: 'enemy', entity: e }))
      break

    case 'all_enemies':
      enemies
        .filter(e => !e.isDead)
        .forEach(e => targets.push({ type: 'enemy', entity: e }))
      break

    case 'any':
      characters
        .filter(c => !c.isDead)
        .forEach(c => targets.push({ type: 'character', entity: c }))
      enemies
        .filter(e => !e.isDead)
        .forEach(e => targets.push({ type: 'enemy', entity: e }))
      break
  }

  return targets
}

// Check if player needs to select target
export function needsTargetSelection(card: Card): boolean {
  return ['single_ally', 'single_enemy', 'any'].includes(card.targetType)
}
