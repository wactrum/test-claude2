// Dungeon generation algorithm

import type { DungeonMap, DungeonNode, Floor, NodeType } from '~/types'
import { SeededRandom } from './seededRandom'

interface GenerationConfig {
  columns: number // Number of columns (depth)
  nodesPerColumn: number // Average nodes per column
  floorNumber: number
}

const DEFAULT_CONFIG: GenerationConfig = {
  columns: 8,
  nodesPerColumn: 4,
  floorNumber: 1
}

// Node type distribution (weights)
const NODE_WEIGHTS: Record<NodeType, number> = {
  combat: 35,
  event: 30,
  elite_combat: 10,
  resource: 15,
  rest: 5,
  lore: 3,
  portal: 2,
  boss: 0 // Boss is placed separately
}

export function generateDungeon(
  seed: string,
  config: Partial<GenerationConfig> = {}
): DungeonMap {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const rng = new SeededRandom(seed)

  const floor = generateFloor(rng, cfg)

  return {
    seed,
    currentFloor: cfg.floorNumber,
    floors: [floor],
    currentNodeId: null,
    visitedNodeIds: []
  }
}

function generateFloor(rng: SeededRandom, config: GenerationConfig): Floor {
  const nodes: DungeonNode[] = []
  let nodeIdCounter = 0

  // Generate columns of nodes
  const columnNodes: DungeonNode[][] = []

  for (let col = 0; col < config.columns; col++) {
    const columnSize = col === 0 || col === config.columns - 1
      ? 1 // First and last column have 1 node
      : rng.nextInt(
          Math.max(2, config.nodesPerColumn - 1),
          config.nodesPerColumn + 1
        )

    const column: DungeonNode[] = []

    for (let row = 0; row < columnSize; row++) {
      const nodeId = `floor${config.floorNumber}_node${nodeIdCounter++}`

      // Determine node type
      let nodeType: NodeType
      if (col === 0) {
        // First node is always combat
        nodeType = 'combat'
      } else if (col === config.columns - 1) {
        // Last node is boss
        nodeType = 'boss'
      } else if (col === config.columns - 2 && row === Math.floor(columnSize / 2)) {
        // Portal before boss
        nodeType = 'portal'
      } else {
        nodeType = selectNodeType(rng)
      }

      const node: DungeonNode = {
        id: nodeId,
        type: nodeType,
        floor: config.floorNumber,
        column: col,
        row,
        visited: false,
        completed: false,
        available: col === 0, // Only first column is available at start
        connectedTo: []
      }

      // Assign content based on type
      if (nodeType === 'combat' || nodeType === 'elite_combat') {
        node.enemyGroupId = `group_${nodeType}_${rng.nextInt(1, 10)}`
      } else if (nodeType === 'event') {
        node.eventId = `event_${rng.nextInt(1, 20)}`
      } else if (nodeType === 'lore') {
        node.loreId = `lore_${rng.nextInt(1, 5)}`
      } else if (nodeType === 'boss') {
        node.enemyGroupId = `boss_floor${config.floorNumber}`
      }

      column.push(node)
      nodes.push(node)
    }

    columnNodes.push(column)
  }

  // Connect nodes between columns
  for (let col = 0; col < columnNodes.length - 1; col++) {
    const currentColumn = columnNodes[col]
    const nextColumn = columnNodes[col + 1]

    for (const node of currentColumn) {
      // Each node connects to 1-3 nodes in next column
      const connectionCount = Math.min(
        rng.nextInt(1, 2),
        nextColumn.length
      )

      const availableTargets = [...nextColumn]
      const selectedTargets: DungeonNode[] = []

      for (let i = 0; i < connectionCount; i++) {
        if (availableTargets.length === 0) break

        // Prefer nodes close to current row
        const weights = availableTargets.map((target) => {
          const rowDiff = Math.abs(target.row - node.row)
          return Math.max(1, 5 - rowDiff)
        })

        const totalWeight = weights.reduce((sum, w) => sum + w, 0)
        let random = rng.next() * totalWeight
        let selectedIndex = 0

        for (let j = 0; j < weights.length; j++) {
          random -= weights[j]
          if (random <= 0) {
            selectedIndex = j
            break
          }
        }

        const target = availableTargets[selectedIndex]
        selectedTargets.push(target)
        availableTargets.splice(selectedIndex, 1)
      }

      // Add connections
      node.connectedTo = selectedTargets.map(t => t.id)
    }
  }

  // Ensure all nodes in next column are reachable
  for (let col = 1; col < columnNodes.length; col++) {
    const prevColumn = columnNodes[col - 1]
    const currentColumn = columnNodes[col]

    for (const node of currentColumn) {
      const isReachable = prevColumn.some(prev =>
        prev.connectedTo.includes(node.id)
      )

      if (!isReachable) {
        // Connect to random node from previous column
        const randomPrev = prevColumn[rng.nextInt(0, prevColumn.length - 1)]
        randomPrev.connectedTo.push(node.id)
      }
    }
  }

  const bossNode = nodes.find(n => n.type === 'boss')

  return {
    number: config.floorNumber,
    nodes,
    bossNodeId: bossNode?.id || '',
    completed: false
  }
}

function selectNodeType(rng: SeededRandom): NodeType {
  const types = Object.entries(NODE_WEIGHTS).filter(([_, weight]) => weight > 0)
  const totalWeight = types.reduce((sum, [_, weight]) => sum + weight, 0)

  let random = rng.next() * totalWeight

  for (const [type, weight] of types) {
    random -= weight
    if (random <= 0) {
      return type as NodeType
    }
  }

  return 'combat' // Fallback
}
