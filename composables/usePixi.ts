// Pixi.js Scene Manager Composable

import { Application, Container } from 'pixi.js'
import type { Ref } from 'vue'

export type SceneType = 'hub' | 'dungeon' | 'event' | 'combat' | 'lore' | 'menu'

interface Scene {
  type: SceneType
  container: Container
  setup?: () => void
  update?: (delta: number) => void
  cleanup?: () => void
}

let app: Application | null = null
const scenes: Map<SceneType, Scene> = new Map()
let currentScene: Scene | null = null

export function usePixi() {
  const isInitialized = ref(false)
  const currentSceneType: Ref<SceneType | null> = ref(null)

  // Initialize Pixi Application
  async function initialize(canvas: HTMLCanvasElement) {
    if (app) {
      console.warn('Pixi already initialized')
      return
    }

    app = new Application()

    await app.init({
      canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x0f172a, // slate-900
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true
    })

    // Handle window resize
    window.addEventListener('resize', handleResize)

    // Start game loop
    app.ticker.add((ticker) => {
      if (currentScene && currentScene.update) {
        currentScene.update(ticker.deltaTime)
      }
    })

    isInitialized.value = true
  }

  function handleResize() {
    if (!app) return

    app.renderer.resize(window.innerWidth, window.innerHeight)

    // Notify current scene of resize
    if (currentScene && currentScene.setup) {
      currentScene.setup()
    }
  }

  // Register a scene
  function registerScene(type: SceneType, scene: Omit<Scene, 'type'>) {
    if (!app) {
      console.error('Pixi not initialized')
      return
    }

    const fullScene: Scene = {
      type,
      ...scene
    }

    scenes.set(type, fullScene)
  }

  // Switch to a scene
  function switchScene(type: SceneType) {
    if (!app) {
      console.error('Pixi not initialized')
      return
    }

    const newScene = scenes.get(type)
    if (!newScene) {
      console.error(`Scene ${type} not registered`)
      return
    }

    // Cleanup current scene
    if (currentScene) {
      if (currentScene.cleanup) {
        currentScene.cleanup()
      }
      app.stage.removeChild(currentScene.container)
    }

    // Setup new scene
    currentScene = newScene
    currentSceneType.value = type

    if (currentScene.setup) {
      currentScene.setup()
    }

    app.stage.addChild(currentScene.container)
  }

  // Get current scene container
  function getCurrentContainer(): Container | null {
    return currentScene?.container || null
  }

  // Cleanup
  function destroy() {
    if (!app) return

    window.removeEventListener('resize', handleResize)

    if (currentScene && currentScene.cleanup) {
      currentScene.cleanup()
    }

    scenes.clear()
    app.destroy(true)
    app = null
    currentScene = null
    isInitialized.value = false
  }

  return {
    isInitialized,
    currentSceneType,
    initialize,
    registerScene,
    switchScene,
    getCurrentContainer,
    destroy
  }
}
