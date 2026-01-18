// Party Store - manages party characters and their state

import { defineStore } from 'pinia'
import type { Character } from '~/types'

export const usePartyStore = defineStore('party', {
  state: () => ({
    characters: [] as Character[],
    gold: 0,
    supplies: 10, // For rest nodes
    sharedInventory: [] as string[] // Item IDs
  }),

  getters: {
    aliveCharacters: (state) => state.characters.filter(c => !c.isDead),
    deadCharacters: (state) => state.characters.filter(c => c.isDead),
    partySize: (state) => state.characters.length,
    averageLevel: (state) => {
      if (state.characters.length === 0) return 1
      const totalLevel = state.characters.reduce((sum, c) => sum + c.level, 0)
      return Math.floor(totalLevel / state.characters.length)
    },
    totalGold: (state) => state.gold
  },

  actions: {
    // Initialize party with starting characters
    initializeParty(characters: Character[]) {
      this.characters = characters
      this.gold = 100 // Starting gold
      this.supplies = 10 // Starting supplies
      this.sharedInventory = []
    },

    // Add character to party
    addCharacter(character: Character) {
      if (this.characters.length >= 4) {
        console.warn('Party is full (max 4 characters)')
        return false
      }
      this.characters.push(character)
      return true
    },

    // Remove character from party
    removeCharacter(characterId: string) {
      const index = this.characters.findIndex(c => c.id === characterId)
      if (index !== -1) {
        this.characters.splice(index, 1)
        return true
      }
      return false
    },

    // Update character
    updateCharacter(characterId: string, updates: Partial<Character>) {
      const character = this.characters.find(c => c.id === characterId)
      if (character) {
        Object.assign(character, updates)
      }
    },

    // Heal character
    healCharacter(characterId: string, amount: number) {
      const character = this.characters.find(c => c.id === characterId)
      if (character) {
        character.hp = Math.min(character.hp + amount, character.maxHp)
      }
    },

    // Damage character
    damageCharacter(characterId: string, amount: number) {
      const character = this.characters.find(c => c.id === characterId)
      if (character) {
        character.hp = Math.max(0, character.hp - amount)
        if (character.hp === 0) {
          character.isDead = true
        }
      }
    },

    // Revive character
    reviveCharacter(characterId: string, hpPercentage: number = 0.5) {
      const character = this.characters.find(c => c.id === characterId)
      if (character && character.isDead) {
        character.isDead = false
        character.hp = Math.floor(character.maxHp * hpPercentage)
      }
    },

    // Gold management
    addGold(amount: number) {
      this.gold += amount
    },

    removeGold(amount: number): boolean {
      if (this.gold >= amount) {
        this.gold -= amount
        return true
      }
      return false
    },

    // Supplies management
    addSupplies(amount: number) {
      this.supplies += amount
    },

    useSupply(): boolean {
      if (this.supplies > 0) {
        this.supplies--
        return true
      }
      return false
    },

    // Inventory management
    addItem(itemId: string) {
      this.sharedInventory.push(itemId)
    },

    removeItem(itemId: string): boolean {
      const index = this.sharedInventory.indexOf(itemId)
      if (index !== -1) {
        this.sharedInventory.splice(index, 1)
        return true
      }
      return false
    },

    hasItem(itemId: string): boolean {
      return this.sharedInventory.includes(itemId)
    },

    // Reset party (for new game)
    reset() {
      this.characters = []
      this.gold = 100
      this.supplies = 10
      this.sharedInventory = []
    }
  }
})
