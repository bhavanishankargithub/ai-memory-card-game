# Memory Matching Card Game

## Overview

Build a memory matching card game using React, Vite, and TypeScript.

---

## Game Rules

The game contains pairs of matching image cards.

All cards are initially hidden.

When a player clicks a card:
- The card flips and reveals its image.
- The image remains visible for 3 seconds.

Matching behavior:
- If the revealed card matches the previously selected unmatched card:
  - Both cards disappear with a pop animation.
- Otherwise:
  - Both cards flip back after 3 seconds.

The game must remember the previous unmatched flipped card.

---

## Difficulty Levels

### Easy
Allowed flips:
2 × total cards

### Medium
Allowed flips:
1.5 × total cards

### Hard
Allowed flips:
1 × total cards

---

## Winning Condition

Player wins if all pairs are matched before flips reach zero.

---

## Losing Condition

Player loses if flips reach zero before all cards are matched.

---

## Card Rules

- Cards must be randomized every game.
- Images must be shuffled randomly.
- Each image appears exactly twice.
- Card positions must be randomized.

---

## UI Requirements

- Responsive layout
- Smooth card flip animations
- Smooth disappear animations
- Modern game UI
- Difficulty selection screen
- Restart game button
- Remaining flips display
- Win/Loss modal

---

## Technical Requirements

- React
- TypeScript
- Tailwind CSS
- Framer Motion

---

## Suggested Components

- GameBoard
- Card
- Header
- DifficultySelector
- GameOverModal
- WinModal

---

## Suggested Hooks

- useGameLogic
- useTimer
- useCardShuffle

---

## Folder Structure

- components
- hooks
- utils
- assets
- types
- pages