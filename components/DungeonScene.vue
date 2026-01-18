<template>
  <div class="h-screen flex flex-col bg-slate-900/50 backdrop-blur-sm">
    <div class="p-6">
      <h1 class="text-3xl font-bold">Dungeon Map</h1>
      <p class="text-slate-400 mt-4">Dungeon generation coming soon...</p>

      <div class="mt-8">
        <button @click="emit('node-selected', 'test-node')" class="btn-primary">
          Test Combat Node
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'node-selected', nodeId: string): void
}>()
</script>
