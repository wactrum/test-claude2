// Event system types

import type { Stats } from './character'

export type SkillCheckType = keyof Stats | 'initiative'

export interface SkillCheck {
  stat: SkillCheckType
  dc: number // Difficulty class
  bonus?: number // Additional bonus/penalty
}

export interface EventReward {
  gold?: number
  items?: string[]
  cards?: string[]
  experience?: number
  heal?: number // HP heal amount or percentage
}

export interface EventPenalty {
  damage?: number
  gold?: number
  statusEffect?: {
    id: string
    duration: number
  }
}

export interface EventOption {
  id: string
  label: string
  description: string

  // Requirements
  check?: SkillCheck
  requiredTags?: string[] // Race/class/profession tags
  requiredItems?: string[] // Consume items

  // Outcomes
  successPhaseId?: string
  failPhaseId?: string
  nextPhaseId?: string // For linear progression

  rewards?: EventReward
  penalties?: EventPenalty

  // Special outcomes
  startCombat?: string // Enemy group ID
}

export interface EventPhase {
  id: string
  text: string
  image?: string
  options: EventOption[]

  // Auto-progression
  autoProgress?: {
    phaseId: string
    delay?: number
  }
}

export interface Event {
  id: string
  title: string
  image?: string
  description: string

  phases: EventPhase[]
  startPhaseId: string

  // Metadata
  tags: string[]
  rarity: 'common' | 'uncommon' | 'rare'
  oneTimeOnly?: boolean // For unique events
}

export interface EventState {
  eventId: string
  currentPhaseId: string
  history: {
    phaseId: string
    optionId: string
    success?: boolean
  }[]
  completed: boolean
}
