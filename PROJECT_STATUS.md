# Card Roguelike RPG - Project Status

## Overview

A D&D-inspired card-based roguelike RPG built with Nuxt 4, TypeScript, Pixi.js, and Tailwind CSS.

**Current Version**: v1.0.0 MVP
**Status**: ✅ MVP COMPLETE - Ready for Testing

---

## 🎮 Playable MVP Features

### ✅ Complete Core Gameplay Loop

The game is fully playable from start to finish with all essential systems implemented:

#### Main Menu
- New Game / Continue Game
- Save file detection
- Settings panel (volume controls)

#### Hub (Town)
- Party management (view 4 characters with stats, HP, decks)
- Shop (purchasable items UI)
- Crafting (profession-based recipes UI)
- Contracts (quest system UI)
- Lore Archive (story entries)
- Enter Dungeon button

#### Dungeon Exploration
- **Procedural Generation**: Seeded RNG for reproducible dungeons
- **8 Node Types**:
  - Combat: Fight 2-4 normal enemies
  - Elite Combat: Fight 1-2 elite enemies
  - Boss: Fight the floor boss (Goblin King)
  - Event: Skill check-based encounters (4 events)
  - Resource: Gain 20-50 gold
  - Rest: Heal 50% HP (costs 1 supply)
  - Portal: Extract to hub (end run)
  - Lore: Unlock story entries
- **Visual Map**: Column-based layout with node cards
- **Navigation**: Click nodes to progress

#### Turn-Based Combat
- **Initiative System**: D20 + DEX modifier determines turn order
- **Energy System**: 3 energy per turn for playing cards
- **Card Playing**: Click card → click target → card plays
- **40+ Unique Cards**: Across 4 classes (Warrior, Rogue, Cleric, Wizard)
- **Card Effects**:
  - Damage with stat scaling
  - Healing
  - Buffs/Debuffs
  - Block (damage reduction)
  - Card draw
- **Enemy AI**: Cooldown-based ability usage
- **8 Enemy Types**: Goblin, Orc, Skeleton, Cultist, Wolf, Champions, Mage, Boss
- **Status Effects**: Duration-based buffs and debuffs
- **Victory/Defeat**: Clear rewards or return to hub

#### Event System
- **Skill Checks**: D20 + stat modifier vs DC
- **Multi-Phase Events**: Branching paths based on success/failure
- **Difficulty Integration**: DC modifiers from difficulty setting
- **Rewards/Penalties**: Gold, items, healing, damage
- **4 Complete Events**:
  - Mysterious Merchant (Charisma check)
  - Trapped Chest (Dexterity/Strength check)
  - Ancient Shrine (Wisdom check)
  - Wandering Healer (no check)

#### Save/Load System
- **Auto-Save**: Every 30 seconds in hub
- **Manual Save**: When entering dungeon
- **localStorage**: Browser-based persistence
- **Versioned**: Save file format v1.0.0
- **Load on Continue**: Restores all progress

---

## 📦 Technical Implementation

### Architecture
- **Nuxt 4 SPA** with TypeScript (strict mode)
- **Pixi.js v8** for game rendering (WebGL/Canvas)
- **Tailwind CSS v4** for UI styling
- **Pinia** for state management
- **Modular Design**: All game data in JSON-compatible formats

### Code Organization

```
/
├── components/        # Vue components for all scenes
│   ├── MenuScene.vue
│   ├── HubScene.vue
│   ├── DungeonScene.vue
│   ├── CombatScene.vue
│   ├── EventScene.vue
│   ├── CharacterCard.vue
│   ├── CardInHand.vue
│   └── DungeonNodeCard.vue
│
├── stores/           # Pinia state management
│   ├── party.ts      # Characters, gold, supplies
│   ├── hub.ts        # Contracts, shop, crafting
│   ├── dungeon.ts    # Map navigation
│   ├── combat.ts     # Combat state, card playing
│   ├── run.ts        # Current run (seed, difficulty)
│   └── game.ts       # Overall progress
│
├── types/            # TypeScript definitions
│   ├── character.ts
│   ├── card.ts
│   ├── combat.ts
│   ├── event.ts
│   ├── dungeon.ts
│   ├── game.ts
│   └── save.ts
│
├── data/             # Game content
│   ├── races.ts      # 4 races with bonuses
│   ├── classes.ts    # 4 classes with starting decks
│   ├── professions.ts # 4 professions
│   ├── cards.ts      # 40+ cards with effects
│   ├── enemies.ts    # 8 enemy types + abilities
│   └── events.ts     # 4 events with phases
│
├── utils/            # Game logic
│   ├── seededRandom.ts     # RNG for dungeon gen
│   ├── dungeonGenerator.ts # Procedural map
│   ├── cardEffects.ts      # Card effect application
│   └── saveLoad.ts         # Save/load system
│
└── pages/
    └── index.vue     # Main game router
```

### State Flow

```
Menu → Hub → Dungeon → [Combat/Event/etc] → Hub (loop)
                ↓
            Save/Load
```

---

## 🎯 What Works

✅ **Complete Gameplay Loop**: Menu → Hub → Dungeon → Combat → Victory → Hub
✅ **Dungeon Generation**: Procedural, seeded, 8 column layout
✅ **Combat System**: Turn-based, energy, cards, targeting, AI
✅ **Event System**: Skill checks, multi-phase, D20 rolls
✅ **Save/Load**: Auto-save, manual save, load on continue
✅ **All Node Types**: Combat, Elite, Boss, Event, Resource, Rest, Portal, Lore
✅ **Character System**: 4 races, 4 classes, 4 professions
✅ **Card System**: 40+ cards with stat scaling
✅ **Enemy System**: 8 types with unique abilities
✅ **Difficulty System**: DC and damage modifiers
✅ **Victory/Defeat**: Proper flow with rewards

---

## ⚠️ Known Limitations (MVP Scope)

### UI-Only Features (No Backend Logic Yet)
- Shop purchases (shows items but can't buy)
- Crafting recipes (shows but can't craft)
- Contract acceptance (shows but doesn't track)

### Simplified Systems
- AI uses first available ability (no advanced strategy)
- Events use first alive character for checks (no selection)
- No card upgrades (system designed but not implemented)
- No character leveling (XP awarded but not used)

### Missing Polish
- No visual effects or animations
- No sound effects or music
- No tutorial or help system
- Basic error handling

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:3000`

---

## 🧪 Testing the Game

1. **Start**: Click "New Game" on menu
2. **Hub**: Party is auto-created with 4 characters
3. **Enter Dungeon**: Click "Enter Dungeon"
4. **Navigate**: Click available nodes (blue border = current, green checkmark = completed)
5. **Combat**:
   - Click card in hand
   - Click enemy to target (if needed)
   - Click "End Turn" when done
6. **Events**: Click choices, see dice rolls
7. **Extract**: Use Portal nodes or Return to Hub button
8. **Save**: Auto-saves in hub, manual save before dungeon

---

## 📊 Game Balance

### Character Stats
- All characters start with 50 HP, 10 in each stat
- Each class has 10 unique starting cards
- Race bonuses grant +1-2 to specific stats

### Combat
- 3 energy per turn
- Cards cost 1-3 energy
- Damage scales with STR/DEX/INT/WIS
- Enemies have 30-150 HP (normal to boss)
- Enemy damage: 5-15 per attack

### Economy
- Start with 100 gold, 10 supplies
- Combat rewards: 5-50 gold per fight
- Resource nodes: 20-50 gold
- Rest costs: 1 supply
- Heal amount: 50% max HP

### Difficulty (Not Fully Implemented)
- Easy: DC-2, Damage×0.7, Rewards×1.2
- Normal: DC+0, Damage×1.0, Rewards×1.0
- Hard: DC+2, Damage×1.3, Rewards×1.0

---

## 🔧 Next Steps (Post-MVP)

### Balance & Polish
- [ ] Playtest and balance all cards
- [ ] Tune enemy HP and damage
- [ ] Adjust gold/reward economy
- [ ] Add visual effects (Pixi.js particles)
- [ ] Add sound effects and music

### Feature Completion
- [ ] Implement shop purchases
- [ ] Implement crafting system
- [ ] Implement contract tracking
- [ ] Add card upgrade system
- [ ] Add character leveling
- [ ] Add more events (target: 20+)
- [ ] Add more enemy types
- [ ] Add more floors and bosses

### Advanced Systems
- [ ] Multiple floors (currently 1)
- [ ] Character death/revival mechanics
- [ ] More professions and crafting recipes
- [ ] More classes and racial abilities
- [ ] Status effect interactions
- [ ] Advanced AI patterns
- [ ] Tutorial system

---

## 📝 Design Philosophy

This MVP follows the GDD's core principles:

1. **Minimalist UI**: Clean, readable interface
2. **D&D Mechanics**: D20 rolls, stat checks, character classes
3. **Card Tactics**: Energy system, deck building, combos
4. **Roguelike**: Procedural generation, run-based gameplay
5. **Role-play Logic**: Events with multiple solutions
6. **Extraction**: Portal nodes allow safe exit

---

## 🎉 Conclusion

**The MVP is complete and fully playable!**

All core systems are implemented and functional. The game has a complete gameplay loop from menu to dungeon and back. Players can:

- Explore procedurally generated dungeons
- Fight enemies with turn-based card combat
- Make choices in skill-based events
- Manage resources (gold, supplies, HP)
- Save and continue their progress

The foundation is solid and ready for content expansion, balance tuning, and polish.

---

**Last Updated**: 2025-01-18
**Build Status**: ✅ Passing (npm run build successful)
**Play Status**: ✅ Fully Playable
