// Dungeon and map types

export type NodeType =
  | 'event'
  | 'combat'
  | 'elite_combat'
  | 'lore'
  | 'resource'
  | 'rest'
  | 'portal'
  | 'boss'

export interface DungeonNode {
  id: string
  type: NodeType

  // Position on map
  floor: number
  column: number
  row: number

  // Content
  eventId?: string // For event nodes
  enemyGroupId?: string // For combat nodes
  loreId?: string // For lore nodes

  // State
  visited: boolean
  completed: boolean
  available: boolean // Can be accessed

  // Connections
  connectedTo: string[] // Node IDs
}

export interface Floor {
  number: number
  nodes: DungeonNode[]
  bossNodeId: string
  completed: boolean
}

export interface DungeonMap {
  seed: string
  currentFloor: number
  floors: Floor[]
  currentNodeId: string | null
  visitedNodeIds: string[]
}

export interface ResourceNode {
  gold: number
  items?: string[]
  supplies?: number
}

export interface LoreEntry {
  id: string
  title: string
  content: string
  image?: string
  unlockedDate?: number
}
