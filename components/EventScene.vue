<template>
  <div class="h-screen flex flex-col bg-slate-900/50 backdrop-blur-sm">
    <div class="p-6">
      <h1 class="text-3xl font-bold">Event</h1>
      <p class="text-slate-400 mt-4">Event system coming soon...</p>

      <div class="mt-8">
        <button @click="emit('event-end')" class="btn-primary">
          Complete Event (Test)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'event-end'): void
}>()
</script>
