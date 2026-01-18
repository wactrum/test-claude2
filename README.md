# Card Roguelike RPG

A D&D-inspired tactical card game roguelike built with modern web technologies.

## Tech Stack

- **Nuxt 4** - Vue 3 framework (SPA mode)
- **TypeScript** - Type-safe development
- **Pixi.js** - WebGL/Canvas rendering for game scenes
- **Tailwind CSS** - Utility-first styling
- **Pinia** - State management

## Features

### Implemented
- ✅ Complete type system for all game entities
- ✅ 4 Races with unique bonuses (Human, Elf, Dwarf, Halfling)
- ✅ 4 Classes with unique mechanics (Warrior, Rogue, Cleric, Wizard)
- ✅ 4 Professions (Blacksmith, Alchemist, Scholar, Ranger)
- ✅ 40+ cards across all classes
- ✅ Pinia stores for game state management
- ✅ Scene manager with Pixi.js integration
- ✅ Hub UI with party management

### In Development
- 🚧 Dungeon procedural generation
- 🚧 Turn-based combat system
- 🚧 Event system with skill checks
- 🚧 Shop and crafting mechanics
- 🚧 Contract system
- 🚧 Save/load functionality

## Game Design

This is a **card-based tactical RPG** with:
- D&D-inspired mechanics (D20 rolls, stat checks, character progression)
- Roguelike elements (procedural dungeons, permadeath optional)
- Deck-building (collect and upgrade cards)
- Strategic combat (energy system, card combos, status effects)
- Role-playing events (skill checks, multiple outcomes)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000` to play.

## Project Structure

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed documentation.

## Development Status

**Current Version**: v0.1.0 (Foundation)

The foundational architecture is complete with all type definitions, game data, and core state management. Currently implementing the core gameplay loop (dungeon generation, combat, events).

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for the full roadmap and progress.

## License

MIT