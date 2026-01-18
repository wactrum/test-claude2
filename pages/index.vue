<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Pixi Canvas -->
    <canvas ref="pixiCanvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- UI Layer -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="pointer-events-auto">
        <!-- Menu Scene -->
        <MenuScene v-if="gameStore.currentScene === 'menu'" @start-game="handleStartGame" />

        <!-- Hub Scene -->
        <HubScene v-else-if="gameStore.currentScene === 'hub'" @enter-dungeon="handleEnterDungeon" />

        <!-- Dungeon Scene -->
        <DungeonScene
          v-else-if="gameStore.currentScene === 'dungeon'"
          @node-selected="handleNodeSelected"
        />

        <!-- Combat Scene -->
        <CombatScene v-else-if="gameStore.currentScene === 'combat'" @combat-end="handleCombatEnd" />

        <!-- Event Scene -->
        <EventScene v-else-if="gameStore.currentScene === 'event'" @event-end="handleEventEnd" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePixi } from '~/composables/usePixi'
import { useGameStore } from '~/stores/game'
import { usePartyStore } from '~/stores/party'
import { useRunStore } from '~/stores/run'
import { useDungeonStore } from '~/stores/dungeon'

const pixiCanvas = ref<HTMLCanvasElement | null>(null)
const { initialize, registerScene, switchScene } = usePixi()

const gameStore = useGameStore()
const partyStore = usePartyStore()
const runStore = useRunStore()
const dungeonStore = useDungeonStore()

onMounted(async () => {
  if (pixiCanvas.value) {
    await initialize(pixiCanvas.value)

    // Register all scenes
    // TODO: Implement actual scene registration
    registerScene('menu', {
      container: new (await import('pixi.js')).Container(),
      setup: () => {
        // Menu scene setup
      }
    })

    // Start with menu
    gameStore.setScene('menu')
    switchScene('menu')
  }
})

onUnmounted(() => {
  const { destroy } = usePixi()
  destroy()
})

// Event handlers
function handleStartGame() {
  gameStore.setScene('hub')
  switchScene('hub')
}

function handleEnterDungeon() {
  // Generate dungeon and start run
  runStore.startRun()
  gameStore.setScene('dungeon')
  switchScene('dungeon')
}

function handleNodeSelected(nodeId: string) {
  const node = dungeonStore.getNode(nodeId)
  if (!node) return

  dungeonStore.navigateToNode(nodeId)

  // Handle different node types
  switch (node.type) {
    case 'combat':
    case 'elite_combat':
    case 'boss':
      gameStore.setScene('combat')
      switchScene('combat')
      break

    case 'event':
      gameStore.setScene('event')
      switchScene('event')
      break

    case 'rest':
      // Use supply and heal party
      if (partyStore.useSupply()) {
        partyStore.characters.forEach(char => {
          partyStore.healCharacter(char.id, Math.floor(char.maxHp * 0.5))
        })
      }
      dungeonStore.completeNode()
      gameStore.setScene('dungeon')
      break

    case 'resource':
      // Give gold and items
      partyStore.addGold(Math.floor(Math.random() * 30) + 20)
      dungeonStore.completeNode()
      gameStore.setScene('dungeon')
      break

    case 'portal':
      // Return to hub
      runStore.endRun()
      gameStore.setScene('hub')
      switchScene('hub')
      break

    case 'lore':
      // Unlock lore
      if (node.loreId) {
        gameStore.unlockLore(node.loreId)
      }
      dungeonStore.completeNode()
      gameStore.setScene('dungeon')
      break

    default:
      break
  }
}

function handleCombatEnd(victory: boolean) {
  if (victory) {
    dungeonStore.completeNode()
    gameStore.setScene('dungeon')
    switchScene('dungeon')
  } else {
    // Defeat - return to hub
    gameStore.setScene('hub')
    switchScene('hub')
  }
}

function handleEventEnd() {
  dungeonStore.completeNode()
  gameStore.setScene('dungeon')
  switchScene('dungeon')
}
</script>
