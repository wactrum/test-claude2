<template>
  <div class="h-screen flex flex-col bg-slate-900/50 backdrop-blur-sm">
    <div class="p-6">
      <h1 class="text-3xl font-bold">Combat</h1>
      <p class="text-slate-400 mt-4">Combat system coming soon...</p>

      <div class="mt-8 space-x-4">
        <button @click="emit('combat-end', true)" class="btn-primary">
          Victory (Test)
        </button>
        <button @click="emit('combat-end', false)" class="btn-danger">
          Defeat (Test)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'combat-end', victory: boolean): void
}>()
</script>
