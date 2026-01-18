<template>
  <div
    class="card-container-light p-6 w-48 cursor-pointer transition-all duration-200 relative"
    :class="{
      'ring-4 ring-blue-500 glow-effect': isCurrent,
      'opacity-40 cursor-not-allowed': !isAvailable || node.completed,
      'hover:scale-105 hover:shadow-2xl': isAvailable && !node.completed,
      'bg-slate-700/50': node.completed
    }"
    @click="handleClick"
  >
    <!-- Node Type Icon -->
    <div class="text-center mb-4">
      <div
        class="w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-3xl font-bold"
        :class="getNodeColor(node.type)"
      >
        {{ getNodeIcon(node.type) }}
      </div>
    </div>

    <!-- Node Type Label -->
    <div class="text-center">
      <p class="text-lg font-bold capitalize text-slate-100">{{ getNodeLabel(node.type) }}</p>
    </div>

    <!-- Status -->
    <div v-if="node.completed" class="absolute top-3 right-3">
      <div class="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
        <span class="text-green-400 text-lg font-bold">✓</span>
      </div>
    </div>

    <div v-else-if="isCurrent" class="absolute top-3 right-3">
      <div class="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center animate-pulse">
        <span class="text-blue-400 text-lg">●</span>
      </div>
    </div>

    <!-- Difficulty indicator for elite/boss -->
    <div v-if="node.type === 'elite_combat' || node.type === 'boss'" class="mt-3 text-center">
      <span class="text-sm font-bold px-3 py-1 rounded-full" :class="node.type === 'boss' ? 'bg-red-500/20 text-red-400 border border-red-500' : 'bg-orange-500/20 text-orange-400 border border-orange-500'">
        {{ node.type === 'boss' ? 'BOSS' : 'ELITE' }}
      </span>
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
    combat: '⚔',
    elite_combat: '⚔',
    boss: '☠',
    event: '?',
    resource: '◈',
    rest: '♥',
    lore: '◊',
    portal: '◉'
  }
  return icons[type] || '?'
}

function getNodeColor(type: NodeType): string {
  const colors: Record<NodeType, string> = {
    combat: 'bg-red-500/20 text-red-400 border-2 border-red-500/50',
    elite_combat: 'bg-orange-500/20 text-orange-400 border-2 border-orange-500/50',
    boss: 'bg-red-700/30 text-red-300 border-2 border-red-700',
    event: 'bg-purple-500/20 text-purple-400 border-2 border-purple-500/50',
    resource: 'bg-amber-500/20 text-amber-400 border-2 border-amber-500/50',
    rest: 'bg-green-500/20 text-green-400 border-2 border-green-500/50',
    lore: 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/50',
    portal: 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500/50'
  }
  return colors[type] || 'bg-slate-500/20 text-slate-400'
}

function getNodeLabel(type: NodeType): string {
  const labels: Record<NodeType, string> = {
    combat: 'Combat',
    elite_combat: 'Elite',
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
