# Card Roguelike RPG

**v1.0.0 MVP - ✅ COMPLETE AND PLAYABLE**

A D&D-inspired tactical card game roguelike built with modern web technologies.

## 🎮 Play Now

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and click "New Game" to start playing!

## 🌟 What's Playable

This is a **fully functional MVP** with complete gameplay loop:

- ✨ **Procedural Dungeons** - Explore seeded, randomized maps with 8 node types
- ⚔️ **Turn-Based Combat** - Strategic card-based battles with 40+ unique cards
- 🎲 **D&D-Style Events** - Skill checks with D20 rolls and branching outcomes
- 💾 **Save/Load System** - Auto-save and manual save with localStorage
- 🏰 **Hub System** - Manage party, shop, crafting, contracts, and lore
- 👥 **4 Character Classes** - Warrior, Rogue, Cleric, Wizard (each with 10 cards)
- 🧙 **8 Enemy Types** - From goblins to the Goblin King boss
- 🎯 **4 Complete Events** - With multi-phase skill checks and rewards

## Tech Stack

- **Nuxt 4** - Vue 3 SPA framework
- **TypeScript** - Full type safety (strict mode)
- **Pixi.js v8** - WebGL/Canvas game rendering
- **Tailwind CSS v4** - Modern utility-first styling
- **Pinia** - Reactive state management

## Game Features

### Combat System
- **Initiative-based turns** using D20 + DEX modifier
- **Energy system** - 3 energy per turn
- **Card playing** with smart targeting
- **Status effects** - Buffs, debuffs, poison, block
- **Enemy AI** with cooldown-based abilities
- **Damage scaling** from character stats (STR/DEX/INT/WIS)

### Exploration
- **8 Node Types**: Combat, Elite, Boss, Event, Resource, Rest, Portal, Lore
- **Visual map** with column-based layout
- **Extraction system** - Portal nodes let you leave safely
- **Resource management** - Gold and supplies

### Events
- **Skill checks** - D20 + stat modifier vs DC
- **Multi-phase branching** - Success/failure paths
- **Rewards & penalties** - Gold, items, healing, damage
- **Difficulty scaling** - DC modifiers based on difficulty

### Progression
- **4 Races** with unique bonuses (Human, Elf, Dwarf, Halfling)
- **4 Classes** with unique playstyles and cards
- **4 Professions** (for crafting and events)
- **Character stats** - STR, DEX, CON, INT, WIS, CHA

## Quick Start

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## How to Play

1. **Main Menu** - Choose "New Game" or "Continue"
2. **Hub** - View your party of 4 characters
3. **Enter Dungeon** - Begin your run
4. **Navigate Map** - Click nodes to progress
5. **Combat** - Click cards to play, click enemies to target
6. **Events** - Make choices and roll skill checks
7. **Extract** - Use Portal nodes to return safely to hub
8. **Repeat** - Build your party stronger and go deeper!

## Project Structure

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for complete documentation including:
- Full feature list
- Architecture details
- Code organization
- Game balance
- Known limitations
- Future roadmap

## Development Status

**Build Status**: ✅ Passing (`npm run build` successful)
**Play Status**: ✅ Fully Playable
**Version**: 1.0.0 MVP

All core systems implemented and functional. Ready for playtesting and balance tuning!

## What's Next

Post-MVP enhancements:
- Shop/Crafting/Contract backend logic
- More events, enemies, and cards
- Multiple floors and bosses
- Visual effects and animations
- Sound and music
- Card upgrade system
- Character leveling
- Tutorial system

## License

MIT
