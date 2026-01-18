// Hub Store - manages hub state (shop, contracts, crafting)

import { defineStore } from 'pinia'
import type { Contract, ShopItem, CraftingRecipe } from '~/types'

export const useHubStore = defineStore('hub', {
  state: () => ({
    // Contracts
    activeContracts: [] as Contract[],
    availableContracts: [] as Contract[],
    maxActiveContracts: 2,

    // Shop
    shopInventory: [] as ShopItem[],
    lastShopRefresh: 0,

    // Crafting
    unlockedRecipes: [] as string[], // Recipe IDs
    availableRecipes: [] as CraftingRecipe[]
  }),

  getters: {
    canAcceptContract: (state) => state.activeContracts.length < state.maxActiveContracts,

    completedContracts: (state) => state.activeContracts.filter(c => c.completed && !c.claimed),

    activeContractsCount: (state) => state.activeContracts.length
  },

  actions: {
    // Contract management
    acceptContract(contract: Contract) {
      if (!this.canAcceptContract) {
        console.warn('Cannot accept more contracts')
        return false
      }

      this.activeContracts.push(contract)
      this.availableContracts = this.availableContracts.filter(c => c.id !== contract.id)
      return true
    },

    updateContractProgress(contractId: string, progress: number) {
      const contract = this.activeContracts.find(c => c.id === contractId)
      if (contract) {
        contract.progress = Math.min(progress, contract.maxProgress)
        if (contract.progress >= contract.maxProgress) {
          contract.completed = true
        }
      }
    },

    claimContractReward(contractId: string) {
      const contract = this.activeContracts.find(c => c.id === contractId)
      if (contract && contract.completed && !contract.claimed) {
        contract.claimed = true
        return {
          gold: contract.goldReward,
          items: contract.itemRewards || []
        }
      }
      return null
    },

    removeContract(contractId: string) {
      this.activeContracts = this.activeContracts.filter(c => c.id !== contractId)
    },

    // Shop management
    refreshShop(items: ShopItem[]) {
      this.shopInventory = items
      this.lastShopRefresh = Date.now()
    },

    purchaseShopItem(itemId: string): boolean {
      const shopItem = this.shopInventory.find(i => i.itemId === itemId)
      if (!shopItem || shopItem.stock === 0) {
        return false
      }

      if (shopItem.stock > 0) {
        shopItem.stock--
      }

      return true
    },

    // Crafting management
    unlockRecipe(recipeId: string) {
      if (!this.unlockedRecipes.includes(recipeId)) {
        this.unlockedRecipes.push(recipeId)
      }
    },

    hasRecipe(recipeId: string): boolean {
      return this.unlockedRecipes.includes(recipeId)
    },

    setAvailableRecipes(recipes: CraftingRecipe[]) {
      this.availableRecipes = recipes
    },

    // Reset hub state
    reset() {
      this.activeContracts = []
      this.availableContracts = []
      this.shopInventory = []
      this.unlockedRecipes = []
      this.availableRecipes = []
      this.lastShopRefresh = 0
    }
  }
})
