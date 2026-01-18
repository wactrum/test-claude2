<template>
  <div
    class="card-container p-4 w-40 cursor-pointer transition-all duration-200 relative"
    :class="{
      'ring-2 ring-blue-500 glow-effect': isCurrent,
      'opacity-50 cursor-not-allowed': !isAvailable || node.completed,
      'hover:scale-105': isAvailable && !node.completed,
      'bg-slate-700': node.completed
    }"
    @click="handleClick"
  >
    <!-- Node Type Icon -->
    <div class="text-center mb-2">
      <span class="text-4xl">{{ getNodeIcon(node.type) }}</span>
    </div>

    <!-- Node Type Label -->
    <div class="text-center">
      <p class="text-sm font-bold capitalize">{{ getNodeLabel(node.type) }}</p>
    </div>

    <!-- Status -->
    <div v-if="node.completed" class="absolute top-2 right-2">
      <span class="text-green-500 text-xl">✓</span>
    </div>

    <div v-else-if="isCurrent" class="absolute top-2 right-2">
      <span class="text-blue-500 text-xl animate-pulse">●</span>
    </div>

    <!-- Difficulty indicator for elite/boss -->
    <div v-if="node.type === 'elite_combat' || node.type === 'boss'" class="mt-2 text-center">
      <span class="text-xs text-red-400">{{ node.type === 'boss' ? 'BOSS' : 'ELITE' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DungeonNode, NodeType } from '~/types'

const props = defineProps<{
  node: DungeonNode
  isCurrent: boolean
  isAvailable: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()

function handleClick() {
  if (props.isAvailable && !props.node.completed) {
    emit('select')
  }
}

function getNodeIcon(type: NodeType): string {
  const icons: Record<NodeType, string> = {
    combat: '⚔️',
    elite_combat: '⚔️',
    boss: '👹',
    event: '📜',
    resource: '💰',
    rest: '🔥',
    lore: '📚',
    portal: '🌀'
  }
  return icons[type] || '?'
}

function getNodeLabel(type: NodeType): string {
  const labels: Record<NodeType, string> = {
    combat: 'Combat',
    elite_combat: 'Elite Combat',
    boss: 'Boss',
    event: 'Event',
    resource: 'Treasure',
    rest: 'Rest',
    lore: 'Lore',
    portal: 'Portal'
  }
  return labels[type] || type
}
</script>
