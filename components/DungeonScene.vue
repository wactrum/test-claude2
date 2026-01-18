<template>
  <div class="h-screen flex flex-col bg-slate-900/50 backdrop-blur-sm">
    <!-- Header -->
    <div class="p-6 border-b border-slate-700">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Floor {{ dungeonStore.currentFloorNumber }}</h1>
          <p class="text-slate-400">Navigate through the dungeon</p>
        </div>
        <div class="flex gap-6 text-lg">
          <div class="flex items-center gap-2">
            <span class="text-yellow-400">●</span>
            <span>{{ partyStore.gold }} Gold</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-blue-400">●</span>
            <span>{{ partyStore.supplies }} Supplies</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dungeon Map -->
    <div class="flex-1 overflow-auto p-8">
      <div v-if="currentFloor" class="flex gap-12 items-start justify-center">
        <!-- Render columns -->
        <div
          v-for="column in groupNodesByColumn"
          :key="column.columnIndex"
          class="flex flex-col gap-4"
        >
          <!-- Column nodes -->
          <DungeonNodeCard
            v-for="node in column.nodes"
            :key="node.id"
            :node="node"
            :is-current="dungeonStore.currentNode?.id === node.id"
            :is-available="isNodeAvailable(node)"
            @select="selectNode(node)"
          />
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-slate-400">No dungeon map available</p>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="p-6 border-t border-slate-700 flex justify-between items-center">
      <button @click="returnToHub" class="btn-secondary">
        Return to Hub
      </button>

      <div class="text-sm text-slate-400">
        Nodes Visited: {{ dungeonStore.visitedNodesCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDungeonStore } from '~/stores/dungeon'
import { usePartyStore } from '~/stores/party'
import { useRunStore } from '~/stores/run'
import { useGameStore } from '~/stores/game'
import type { DungeonNode } from '~/types'
import { generateDungeon } from '~/utils/dungeonGenerator'

const emit = defineEmits<{
  (e: 'node-selected', nodeId: string): void
}>()

const dungeonStore = useDungeonStore()
const partyStore = usePartyStore()
const runStore = useRunStore()
const gameStore = useGameStore()

const currentFloor = computed(() => dungeonStore.currentFloor)

const groupNodesByColumn = computed(() => {
  if (!currentFloor.value) return []

  const columns: { columnIndex: number; nodes: DungeonNode[] }[] = []
  const maxColumn = Math.max(...currentFloor.value.nodes.map(n => n.column))

  for (let i = 0; i <= maxColumn; i++) {
    const nodesInColumn = currentFloor.value.nodes
      .filter(n => n.column === i)
      .sort((a, b) => a.row - b.row)

    columns.push({
      columnIndex: i,
      nodes: nodesInColumn
    })
  }

  return columns
})

function isNodeAvailable(node: DungeonNode): boolean {
  // Node is available if it's the current node or connected to current node
  if (!dungeonStore.currentNode) {
    return node.available
  }

  return dungeonStore.currentNode.connectedTo.includes(node.id) ||
         node.id === dungeonStore.currentNode.id
}

function selectNode(node: DungeonNode) {
  if (isNodeAvailable(node) && !node.completed) {
    emit('node-selected', node.id)
  }
}

function returnToHub() {
  // End current run
  runStore.endRun()
  gameStore.setScene('hub')
}

onMounted(() => {
  // Generate dungeon if not exists
  if (!dungeonStore.map) {
    const map = generateDungeon(runStore.seed, {
      floorNumber: runStore.currentFloor
    })
    dungeonStore.initializeDungeon(map)

    // Navigate to first node
    const firstNode = map.floors[0].nodes.find(n => n.column === 0)
    if (firstNode) {
      dungeonStore.navigateToNode(firstNode.id)
    }
  }
})
</script>
