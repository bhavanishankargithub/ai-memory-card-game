import type { Difficulty } from '../types/game'

export const PAIR_COUNT = 8
export const TOTAL_CARDS = PAIR_COUNT * 2

/** Single flipped card auto-hides if no second pick (GAME_LOGIC) */
export const SINGLE_CARD_REVEAL_MS = 5000

/** Both cards stay visible before mismatch flip-back (GAME_LOGIC) */
export const PAIR_MISMATCH_REVEAL_MS = 3000

/** Pause before match pop animation starts (GAME_LOGIC) */
export const MATCH_WAIT_MS = 1500

/** Pop/disappear animation duration after match wait */
export const MATCH_POP_ANIMATION_MS = 550

/**
 * Flip budget per difficulty (SPEC):
 * Easy: 2× cards, Medium: 1.5× cards, Hard: 1× cards
 */
export function getMaxFlips(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy':
      return TOTAL_CARDS * 2
    case 'medium':
      return Math.floor(TOTAL_CARDS * 1.5)
    case 'hard':
      return TOTAL_CARDS
    default:
      return TOTAL_CARDS
  }
}

export const DIFFICULTY_LABELS: Record<
  Difficulty,
  { title: string; description: string }
> = {
  easy: {
    title: 'Easy',
    description: `${TOTAL_CARDS * 2} flips — generous practice mode`,
  },
  medium: {
    title: 'Medium',
    description: `${Math.floor(TOTAL_CARDS * 1.5)} flips — balanced challenge`,
  },
  hard: {
    title: 'Hard',
    description: `${TOTAL_CARDS} flips — one try per card`,
  },
}
