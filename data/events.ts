// Event definitions

import type { Event } from '~/types'

export const EVENTS: Record<string, Event> = {
  event_1: {
    id: 'event_1',
    title: 'Mysterious Merchant',
    description: 'A hooded figure approaches with rare wares',
    phases: [
      {
        id: 'start',
        text: 'A mysterious merchant offers to sell you a powerful artifact for 50 gold.',
        options: [
          {
            id: 'buy',
            label: 'Buy the artifact',
            description: 'Spend 50 gold',
            penalties: { gold: 50 },
            rewards: { items: ['artifact_mystery'] },
            nextPhaseId: 'bought'
          },
          {
            id: 'negotiate',
            label: 'Try to negotiate',
            description: 'Charisma check (DC 14)',
            check: { stat: 'cha', dc: 14 },
            successPhaseId: 'negotiated',
            failPhaseId: 'offended'
          },
          {
            id: 'leave',
            label: 'Walk away',
            description: 'Leave peacefully',
            nextPhaseId: 'left'
          }
        ]
      },
      {
        id: 'bought',
        text: 'The merchant smiles and hands you the artifact. It pulses with unknown power.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          nextPhaseId: ''
        }]
      },
      {
        id: 'negotiated',
        text: 'Your charm works! The merchant agrees to sell for 30 gold.',
        options: [{
          id: 'buy_cheap',
          label: 'Buy it',
          description: 'Spend 30 gold',
          penalties: { gold: 30 },
          rewards: { items: ['artifact_mystery'] },
          nextPhaseId: 'bought'
        }]
      },
      {
        id: 'offended',
        text: 'The merchant is offended and walks away.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          nextPhaseId: ''
        }]
      },
      {
        id: 'left',
        text: 'You walk away from the merchant.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          nextPhaseId: ''
        }]
      }
    ],
    startPhaseId: 'start',
    tags: ['merchant', 'social'],
    rarity: 'uncommon'
  },

  event_2: {
    id: 'event_2',
    title: 'Trapped Chest',
    description: 'A treasure chest... but something feels wrong',
    phases: [
      {
        id: 'start',
        text: 'You find a chest covered in dust. It looks valuable, but you notice thin wires attached to the lock.',
        options: [
          {
            id: 'open_carefully',
            label: 'Disarm the trap',
            description: 'Dexterity check (DC 12)',
            check: { stat: 'dex', dc: 12 },
            successPhaseId: 'disarmed',
            failPhaseId: 'triggered'
          },
          {
            id: 'smash',
            label: 'Smash it open',
            description: 'Strength check (DC 14)',
            check: { stat: 'str', dc: 14 },
            successPhaseId: 'smashed',
            failPhaseId: 'triggered'
          },
          {
            id: 'leave',
            label: 'Leave it',
            description: 'Too risky',
            nextPhaseId: 'left'
          }
        ]
      },
      {
        id: 'disarmed',
        text: 'You carefully disarm the trap and open the chest, finding treasure inside!',
        options: [{
          id: 'take',
          label: 'Take the treasure',
          description: '',
          rewards: { gold: 50, items: ['potion_heal'] },
          nextPhaseId: ''
        }]
      },
      {
        id: 'smashed',
        text: 'With a mighty blow, you destroy the chest and the trap mechanism!',
        options: [{
          id: 'take',
          label: 'Collect the gold',
          description: '',
          rewards: { gold: 30 },
          nextPhaseId: ''
        }]
      },
      {
        id: 'triggered',
        text: 'The trap springs! Poisoned darts hit your party.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          penalties: { damage: 10 },
          rewards: { gold: 20 },
          nextPhaseId: ''
        }]
      },
      {
        id: 'left',
        text: 'You wisely decide to leave the chest alone.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          nextPhaseId: ''
        }]
      }
    ],
    startPhaseId: 'start',
    tags: ['trap', 'treasure'],
    rarity: 'common'
  },

  event_3: {
    id: 'event_3',
    title: 'Ancient Shrine',
    description: 'A forgotten shrine radiates divine energy',
    phases: [
      {
        id: 'start',
        text: 'You discover an ancient shrine dedicated to a forgotten deity. A soft glow emanates from the altar.',
        options: [
          {
            id: 'pray',
            label: 'Pray at the shrine',
            description: 'Wisdom check (DC 10)',
            check: { stat: 'wis', dc: 10 },
            successPhaseId: 'blessed',
            failPhaseId: 'nothing'
          },
          {
            id: 'take_offering',
            label: 'Take the golden offerings',
            description: 'Risky but profitable',
            nextPhaseId: 'curse'
          },
          {
            id: 'leave',
            label: 'Leave respectfully',
            description: '',
            nextPhaseId: 'left'
          }
        ]
      },
      {
        id: 'blessed',
        text: 'The deity is pleased! You receive a divine blessing.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          rewards: { heal: 50 },
          nextPhaseId: ''
        }]
      },
      {
        id: 'nothing',
        text: 'Nothing happens. Perhaps your faith was not strong enough.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          nextPhaseId: ''
        }]
      },
      {
        id: 'curse',
        text: 'As you take the offerings, the shrine trembles. You feel a dark curse upon you, but gain gold.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          rewards: { gold: 100 },
          penalties: { damage: 15 },
          nextPhaseId: ''
        }]
      },
      {
        id: 'left',
        text: 'You leave the shrine undisturbed.',
        options: [{
          id: 'continue',
          label: 'Continue',
          description: '',
          nextPhaseId: ''
        }]
      }
    ],
    startPhaseId: 'start',
    tags: ['shrine', 'divine'],
    rarity: 'rare'
  },

  // More events...
  event_4: {
    id: 'event_4',
    title: 'Wandering Healer',
    description: 'A kind healer offers aid',
    phases: [
      {
        id: 'start',
        text: 'A wandering healer notices your wounds and offers to help for a small fee.',
        options: [
          {
            id: 'pay',
            label: 'Pay 20 gold',
            description: 'Get healed',
            penalties: { gold: 20 },
            rewards: { heal: 30 },
            nextPhaseId: ''
          },
          {
            id: 'refuse',
            label: 'Politely decline',
            description: '',
            nextPhaseId: ''
          }
        ]
      }
    ],
    startPhaseId: 'start',
    tags: ['healer', 'social'],
    rarity: 'common'
  }
}

export function getEvent(id: string): Event | undefined {
  return EVENTS[id]
}

export function getAllEvents(): Event[] {
  return Object.values(EVENTS)
}

export function getRandomEvent(): Event {
  const events = getAllEvents()
  return events[Math.floor(Math.random() * events.length)]
}
