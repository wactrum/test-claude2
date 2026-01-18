# Card Roguelike RPG - Project Status

## Overview

A D&D-inspired card-based roguelike RPG built with Nuxt 4, TypeScript, Pixi.js, and Tailwind CSS.

## Current Implementation Status (v0.1 - Foundation)

### ✅ Completed

#### Core Architecture
- **Nuxt 4 SPA** - Full TypeScript setup with strict mode
- **Pixi.js Integration** - Scene manager with canvas/UI separation
- **Tailwind CSS v4** - UI layer styling system
- **Pinia State Management** - 6 stores for game state

#### TypeScript Types
All game entities have complete type definitions:
- Character (with stats, cards, inventory)
- Card (40+ cards with effects and upgrades)
- Combat (turn-based system with initiative)
- Event (multi-phase with skill checks)
- Dungeon (node-based map structure)
- Save/Load (versioned save system)

#### Game Data
- **4 Races**: Human, Elf, Dwarf, Halfling (with racial bonuses)
- **4 Classes**: Warrior, Rogue, Cleric, Wizard (each with 10 starting cards)
- **4 Professions**: Blacksmith, Alchemist, Scholar, Ranger
- **40+ Cards**: Fully defined with costs, effects, and upgrade paths

#### Pinia Stores
1. **partyStore** - Party management, gold, supplies, inventory
2. **hubStore** - Contracts, shop, crafting recipes
3. **dungeonStore** - Map navigation, node tracking
4. **combatStore** - Combat state, turn order, card drawing
5. **runStore** - Current run tracking (seed, difficulty, floor)
6. **gameStore** - Overall progress, scene management

#### UI Components
- **MenuScene** - Main menu with settings
- **HubScene** - Party view, tabs for contracts/shop/craft/lore
- **CharacterCard** - Full character display with stats and HP
- **Placeholder scenes** for Dungeon, Combat, Events

### 🚧 In Progress / Next Steps

#### Priority 1: Core Gameplay Loop
1. **Dungeon Generation**
   - Implement procedural map generation with seed
   - Node placement algorithm (combat, events, rest, portal, boss)
   - Path generation ensuring reachability
   - Visual rendering in Pixi.js

2. **Combat System**
   - Full card playing mechanics
   - Energy system (3 energy per turn)
   - Damage calculation with stat scaling
   - Status effects (buffs/debuffs)
   - Enemy AI with ability patterns
   - Victory/defeat conditions with rewards

3. **Event System**
   - Event data (JSON format)
   - Skill check mechanics (D20 + modifiers vs DC)
   - Multi-phase event flow
   - Character selection for checks
   - Success/failure outcomes

#### Priority 2: Meta Systems
4. **Contracts System**
   - Contract generation
   - Progress tracking
   - Reward claiming
   - Hub integration

5. **Shop System**
   - Card shop with rarity-based pricing
   - Card upgrade system
   - Consumable items (potions, scrolls)
   - Inventory management

6. **Crafting System**
   - Recipe unlocking via professions
   - Material gathering
   - Item crafting UI

#### Priority 3: Progression & Polish
7. **Difficulty System**
   - Apply modifiers to DC, damage, rewards
   - Difficulty selection UI

8. **Boss Encounters**
   - Boss design (1 per floor)
   - Unique abilities and mechanics
   - Lore unlocks on defeat

9. **Save/Load System**
   - LocalStorage implementation
   - Auto-save on node completion
   - Manual save option
   - Load game validation

10. **Polish & Balance**
    - Card balance testing
    - Enemy difficulty tuning
    - Visual effects (Pixi.js particles)
    - Sound effects and music integration

### 📁 Project Structure

```
/
├── app.vue                 # Main app entry
├── nuxt.config.ts          # Nuxt configuration
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies
│
├── assets/
│   └── css/main.css        # Tailwind + custom styles
│
├── components/
│   ├── MenuScene.vue       # Main menu
│   ├── HubScene.vue        # Hub/town
│   ├── DungeonScene.vue    # Dungeon map (placeholder)
│   ├── CombatScene.vue     # Combat (placeholder)
│   ├── EventScene.vue      # Events (placeholder)
│   └── CharacterCard.vue   # Character display
│
├── composables/
│   └── usePixi.ts          # Pixi.js scene manager
│
├── data/
│   ├── races.ts            # Race definitions
│   ├── classes.ts          # Class definitions
│   ├── professions.ts      # Profession definitions
│   ├── cards.ts            # All card data
│   └── index.ts            # Exports
│
├── pages/
│   └── index.vue           # Main game page
│
├── stores/
│   ├── party.ts            # Party management
│   ├── hub.ts              # Hub state
│   ├── dungeon.ts          # Dungeon state
│   ├── combat.ts           # Combat state
│   ├── run.ts              # Run tracking
│   └── game.ts             # Overall game state
│
└── types/
    ├── character.ts        # Character types
    ├── card.ts             # Card types
    ├── combat.ts           # Combat types
    ├── event.ts            # Event types
    ├── dungeon.ts          # Dungeon types
    ├── game.ts             # Game types
    ├── save.ts             # Save types
    └── index.ts            # Central exports
```

### 🎮 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🎯 Design Principles

1. **Minimalist UI** - Clean, readable interface over visual noise
2. **D&D Mechanics** - D20 rolls, skill checks, character stats
3. **Tactical Depth** - Card synergies, positioning, resource management
4. **Roguelike Replayability** - Procedural generation, permadeath optional
5. **Role-play Logic** - Flexible event outcomes based on character abilities

### 📊 Technical Specifications

- **Framework**: Nuxt 4 (SPA mode)
- **Language**: TypeScript (strict mode)
- **Rendering**: Pixi.js v8 (WebGL/Canvas)
- **Styling**: Tailwind CSS v4
- **State**: Pinia
- **Package Manager**: npm

### 🐛 Known Issues

- Dev server shows TypeScript type checking in watch mode (non-blocking)
- Placeholder scenes need full implementation
- No enemy data defined yet
- No event data defined yet
- Save/load not implemented

### 🚀 MVP Roadmap

**Phase 1** (Current): Foundation ✅
- Project setup
- Type system
- Base UI
- Data structures

**Phase 2**: Core Loop 🚧
- Dungeon generation
- Combat system
- Event system

**Phase 3**: Meta Systems
- Contracts
- Shop
- Crafting

**Phase 4**: Polish
- Save/load
- Balance
- Visual effects
- Audio

### 📝 Notes

- All game logic is declarative and data-driven
- AI-friendly architecture for content generation
- Designed for single-player web play
- Desktop-first, mobile optional future enhancement

### 🔗 References

- Game Design Document (GDD v1.0)
- Technical Design Document (TDD)

---

**Last Updated**: 2025-01-18
**Version**: 0.1.0 (Foundation)
**Status**: In Active Development
