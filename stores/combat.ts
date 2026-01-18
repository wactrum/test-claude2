// Combat Store - manages combat state and actions

import { defineStore } from 'pinia'
import type { CombatState, CombatEntity, Character, Enemy } from '~/types'

export const useCombatStore = defineStore('combat', {
  state: () => ({
    isActive: false,
    turnNumber: 0,

    characters: [] as Character[],
    enemies: [] as Enemy[],

    turnOrder: [] as CombatEntity[],
    currentEntityIndex: 0,

    rewards: undefined as {
      gold: number
      experience: number
      items: string[]
    } | undefined,

    victory: false,
    defeat: false,

    // Combat settings
    maxEnergy: 3,
    energyPerTurn: 3
  } as CombatState & { maxEnergy: number; energyPerTurn: number }),

  getters: {
    currentEntity: (state): CombatEntity | null => {
      return state.turnOrder[state.currentEntityIndex] || null
    },

    isPlayerTurn: (state): boolean => {
      const current = state.turnOrder[state.currentEntityIndex]
      return current?.type === 'character'
    },

    aliveCharacters: (state) => state.characters.filter(c => !c.isDead),
    aliveEnemies: (state) => state.enemies.filter(e => !e.isDead),

    isCombatOver: (state) => state.victory || state.defeat
  },

  actions: {
    // Initialize combat
    startCombat(characters: Character[], enemies: Enemy[]) {
      this.isActive = true
      this.turnNumber = 1
      this.characters = characters
      this.enemies = enemies
      this.victory = false
      this.defeat = false
      this.rewards = undefined

      // Calculate initiative and create turn order
      this.calculateTurnOrder()
      this.currentEntityIndex = 0

      // Start first turn
      this.startTurn()
    },

    // Calculate turn order based on initiative
    calculateTurnOrder() {
      const entities: CombatEntity[] = []

      // Add characters
      this.characters.forEach(char => {
        if (!char.isDead) {
          const initiative = this.rollInitiative(char)
          entities.push({
            type: 'character',
            entity: char,
            initiative,
            energy: this.maxEnergy,
            maxEnergy: this.maxEnergy
          })
        }
      })

      // Add enemies
      this.enemies.forEach(enemy => {
        if (!enemy.isDead) {
          const initiative = Math.floor(Math.random() * 20) + 1 + enemy.initiativeBonus
          entities.push({
            type: 'enemy',
            entity: enemy,
            initiative,
            energy: 0,
            maxEnergy: 0
          })
        }
      })

      // Sort by initiative (highest first)
      entities.sort((a, b) => b.initiative - a.initiative)
      this.turnOrder = entities
    },

    rollInitiative(character: Character): number {
      const dexMod = Math.floor((character.stats.dex - 10) / 2)
      return Math.floor(Math.random() * 20) + 1 + dexMod + character.initiativeBonus
    },

    // Start a new turn
    startTurn() {
      const current = this.currentEntity
      if (!current) return

      if (current.type === 'character') {
        // Restore energy for player turn
        current.energy = this.energyPerTurn

        // Draw cards
        const character = current.entity as Character
        this.drawCards(character, 5) // Draw 5 cards
      } else {
        // Enemy turn - process AI
        this.processEnemyTurn(current.entity as Enemy)
      }
    },

    // End current turn
    endTurn() {
      // Process end-of-turn effects
      this.processEndOfTurnEffects()

      // Move to next entity
      this.currentEntityIndex++

      // Check if round is complete
      if (this.currentEntityIndex >= this.turnOrder.length) {
        this.currentEntityIndex = 0
        this.turnNumber++
      }

      // Remove dead entities from turn order
      this.turnOrder = this.turnOrder.filter(entity => {
        if (entity.type === 'character') {
          return !(entity.entity as Character).isDead
        } else {
          return !(entity.entity as Enemy).isDead
        }
      })

      // Check victory/defeat conditions
      this.checkCombatEnd()

      if (!this.isCombatOver) {
        this.startTurn()
      }
    },

    // Draw cards for character
    drawCards(character: Character, count: number) {
      for (let i = 0; i < count; i++) {
        if (character.drawPile.length === 0) {
          // Shuffle discard pile into draw pile
          character.drawPile = [...character.discardPile]
          character.discardPile = []

          // Shuffle
          for (let j = character.drawPile.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1))
            ;[character.drawPile[j], character.drawPile[k]] = [character.drawPile[k], character.drawPile[j]]
          }
        }

        if (character.drawPile.length > 0) {
          const card = character.drawPile.shift()
          if (card) {
            character.hand.push(card)
          }
        }
      }
    },

    // Process enemy AI turn
    processEnemyTurn(enemy: Enemy) {
      // Simple AI: use first available ability
      const availableAbility = enemy.abilities.find(a => a.currentCooldown === 0)

      if (availableAbility) {
        // Execute ability (simplified)
        console.log(`${enemy.name} uses ${availableAbility.name}`)

        // Set cooldown
        availableAbility.currentCooldown = availableAbility.cooldown

        // Auto-end turn after delay
        setTimeout(() => {
          this.endTurn()
        }, 1000)
      } else {
        // No abilities available, just end turn
        setTimeout(() => {
          this.endTurn()
        }, 500)
      }
    },

    // Process end-of-turn effects (status effects, cooldowns, etc.)
    processEndOfTurnEffects() {
      const current = this.currentEntity
      if (!current) return

      // Update status effects
      if (current.type === 'character') {
        const character = current.entity as Character
        character.statusEffects.forEach(effect => {
          if (effect.duration > 0) {
            effect.duration--
          }
        })
        // Remove expired effects
        character.statusEffects = character.statusEffects.filter(e => e.duration !== 0)
      } else {
        const enemy = current.entity as Enemy
        enemy.statusEffects.forEach(effect => {
          if (effect.duration > 0) {
            effect.duration--
          }
        })
        enemy.statusEffects = enemy.statusEffects.filter(e => e.duration !== 0)

        // Reduce ability cooldowns
        enemy.abilities.forEach(ability => {
          if (ability.currentCooldown > 0) {
            ability.currentCooldown--
          }
        })
      }
    },

    // Check if combat has ended
    checkCombatEnd() {
      const aliveChars = this.characters.filter(c => !c.isDead)
      const aliveEnemies = this.enemies.filter(e => !e.isDead)

      if (aliveEnemies.length === 0) {
        this.victory = true
        this.calculateRewards()
      } else if (aliveChars.length === 0) {
        this.defeat = true
      }
    },

    // Calculate combat rewards
    calculateRewards() {
      let gold = 0
      const items: string[] = []
      let experience = 0

      this.enemies.forEach(enemy => {
        // Gold
        const goldDrop = Math.floor(
          Math.random() * (enemy.goldDrop.max - enemy.goldDrop.min + 1) + enemy.goldDrop.min
        )
        gold += goldDrop

        // Items
        enemy.itemDrops.forEach(drop => {
          if (Math.random() < drop.chance) {
            items.push(drop.itemId)
          }
        })

        // Experience
        experience += enemy.isBoss ? 100 : 25
      })

      this.rewards = { gold, experience, items }
    },

    // Play a card
    async playCard(characterId: string, cardId: string, targetIds: string[] = []) {
      const character = this.characters.find(c => c.id === characterId)
      if (!character) return false

      // Find card in hand
      const cardIndex = character.hand.indexOf(cardId)
      if (cardIndex === -1) return false

      // Get card data
      const { getCard } = await import('~/data')
      const card = getCard(cardId)
      if (!card) return false

      // Check energy cost
      const currentEntity = this.turnOrder.find(e =>
        e.type === 'character' && (e.entity as Character).id === characterId
      )
      if (!currentEntity || currentEntity.energy < card.energyCost) {
        return false
      }

      // Build targets
      const { getValidTargets, applyCardEffects } = await import('~/utils/cardEffects')
      const allTargets = getValidTargets(card, this.characters, this.enemies, character)

      let selectedTargets = allTargets

      // If specific targets are selected
      if (targetIds.length > 0) {
        selectedTargets = allTargets.filter(t => targetIds.includes(t.entity.id))
      }

      // Apply card effects
      applyCardEffects(card, character, selectedTargets)

      // Deduct energy
      currentEntity.energy -= card.energyCost

      // Move card from hand to discard
      character.hand.splice(cardIndex, 1)
      character.discardPile.push(cardId)

      // Check combat end
      this.checkCombatEnd()

      return true
    },

    // Can play card
    canPlayCard(characterId: string, cardId: string): boolean {
      const character = this.characters.find(c => c.id === characterId)
      if (!character) return false

      const currentEntity = this.turnOrder.find(e =>
        e.type === 'character' && (e.entity as Character).id === characterId
      )
      if (!currentEntity) return false

      // Import card data synchronously for check
      // In real implementation, this should be cached
      return true // Simplified for now
    },

    // End combat
    endCombat() {
      this.isActive = false
      // Note: Don't reset state here, allow access to rewards
    },

    // Reset combat
    reset() {
      this.isActive = false
      this.turnNumber = 0
      this.characters = []
      this.enemies = []
      this.turnOrder = []
      this.currentEntityIndex = 0
      this.rewards = undefined
      this.victory = false
      this.defeat = false
    }
  }
})
