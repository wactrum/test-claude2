// Dungeon Store - manages dungeon map and navigation

import { defineStore } from 'pinia'
import type { DungeonMap, DungeonNode, Floor } from '~/types'

export const useDungeonStore = defineStore('dungeon', {
  state: () => ({
    map: null as DungeonMap | null,
    currentNode: null as DungeonNode | null
  }),

  getters: {
    currentFloor: (state): Floor | null => {
      if (!state.map) return null
      return state.map.floors.find(f => f.number === state.map!.currentFloor) || null
    },

    currentFloorNumber: (state) => state.map?.currentFloor || 1,

    availableNodes: (state): DungeonNode[] => {
      if (!state.map || !state.currentNode) return []
      const currentFloor = state.map.floors.find(f => f.number === state.map!.currentFloor)
      if (!currentFloor) return []

      return currentFloor.nodes.filter(node =>
        state.currentNode!.connectedTo.includes(node.id)
      )
    },

    isFloorComplete: (state): boolean => {
      if (!state.map) return false
      const floor = state.map.floors.find(f => f.number === state.map!.currentFloor)
      return floor?.completed || false
    },

    visitedNodesCount: (state) => state.map?.visitedNodeIds.length || 0
  },

  actions: {
    // Initialize dungeon
    initializeDungeon(map: DungeonMap) {
      this.map = map
      this.currentNode = null
    },

    // Navigate to node
    navigateToNode(nodeId: string) {
      if (!this.map) return false

      const currentFloor = this.map.floors.find(f => f.number === this.map!.currentFloor)
      if (!currentFloor) return false

      const node = currentFloor.nodes.find(n => n.id === nodeId)
      if (!node) return false

      // Check if node is available
      if (!node.available && this.currentNode) {
        if (!this.currentNode.connectedTo.includes(nodeId)) {
          console.warn('Node is not accessible')
          return false
        }
      }

      this.currentNode = node
      this.map.currentNodeId = nodeId

      // Mark as visited
      if (!this.map.visitedNodeIds.includes(nodeId)) {
        this.map.visitedNodeIds.push(nodeId)
      }

      node.visited = true

      return true
    },

    // Complete current node
    completeNode() {
      if (this.currentNode) {
        this.currentNode.completed = true

        // Unlock connected nodes
        if (this.map) {
          const currentFloor = this.map.floors.find(f => f.number === this.map!.currentFloor)
          if (currentFloor) {
            this.currentNode.connectedTo.forEach(connectedId => {
              const connectedNode = currentFloor.nodes.find(n => n.id === connectedId)
              if (connectedNode) {
                connectedNode.available = true
              }
            })
          }
        }
      }
    },

    // Progress to next floor
    progressToNextFloor() {
      if (!this.map) return false

      const currentFloor = this.map.floors.find(f => f.number === this.map!.currentFloor)
      if (currentFloor) {
        currentFloor.completed = true
      }

      this.map.currentFloor++
      this.currentNode = null

      // Find starting node on new floor
      const nextFloor = this.map.floors.find(f => f.number === this.map!.currentFloor)
      if (nextFloor) {
        const startNode = nextFloor.nodes.find(n => n.row === 0)
        if (startNode) {
          startNode.available = true
          this.navigateToNode(startNode.id)
        }
      }

      return true
    },

    // Get node by ID
    getNode(nodeId: string): DungeonNode | null {
      if (!this.map) return null

      for (const floor of this.map.floors) {
        const node = floor.nodes.find(n => n.id === nodeId)
        if (node) return node
      }

      return null
    },

    // Reset dungeon
    reset() {
      this.map = null
      this.currentNode = null
    }
  }
})
