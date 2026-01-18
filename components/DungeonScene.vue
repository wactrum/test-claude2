<template>
  <div class="relative h-screen flex flex-col overflow-hidden">
    <!-- Background Image -->
    <div
      class="scene-bg"
      style="background-image: url('/images/u4419938122_Wide_stone_bridge_corridor_of_a_warm_late-medie_d54c2757-ccf2-4c56-93cc-fcdf8b3b5d2a_1.png')"
    ></div>
    <div class="scene-overlay"></div>

    <!-- Header -->
    <div class="relative z-10 p-8 border-b border-purple-600/30 bg-slate-900/60 backdrop-blur-md">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200">
            Floor {{ dungeonStore.currentFloorNumber }}
          </h1>
          <p class="text-slate-200 text-xl mt-2">Navigate through the dungeon</p>
        </div>
        <div class="flex gap-8 text-xl">
          <div class="flex items-center gap-3 px-6 py-3 bg-amber-950/50 rounded-xl border border-amber-600/30">
            <span class="text-amber-400 font-bold">◈</span>
            <span class="font-semibold text-amber-200">{{ partyStore.gold }} Gold</span>
          </div>
          <div class="flex items-center gap-3 px-6 py-3 bg-blue-950/50 rounded-xl border border-blue-600/30">
            <span class="text-blue-400 font-bold">▪</span>
            <span class="font-semibold text-blue-200">{{ partyStore.supplies }} Supplies</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dungeon Map -->
    <div class="relative z-10 flex-1 overflow-auto p-10 bg-slate-900/20 backdrop-blur-sm">
      <div v-if="currentFloor" class="flex gap-16 items-start justify-center">
        <!-- Render columns -->
        <div
          v-for="column in groupNodesByColumn"
          :key="column.columnIndex"
          class="flex flex-col gap-6"
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

      <div v-else class="text-center py-16">
        <p class="text-slate-200 text-2xl">No dungeon map available</p>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="relative z-10 p-8 border-t border-purple-600/30 bg-slate-900/60 backdrop-blur-md flex justify-between items-center">
      <button @click="returnToHub" class="btn-secondary py-4 px-8 text-lg">
        Return to Hub
      </button>

      <div class="text-lg text-slate-200 px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-600/30">
        Nodes Visited: <span class="font-bold text-purple-300">{{ dungeonStore.visitedNodesCount }}</span>
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
