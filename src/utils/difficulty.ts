import type { Difficulty } from '../types/game'

/** Single flipped card auto-hides if no second pick (GAME_LOGIC) */
export const SINGLE_CARD_REVEAL_MS = 5000

/** Both cards stay visible before mismatch flip-back (GAME_LOGIC) */
export const PAIR_MISMATCH_REVEAL_MS = 3000

/** Pause before match pop animation starts (GAME_LOGIC) */
export const MATCH_WAIT_MS = 1500

/** Pop/disappear animation duration after match wait */
export const MATCH_POP_ANIMATION_MS = 550

const FLIP_MULTIPLIERS: Record<Difficulty, number> = {
  easy: 4,
  medium: 3,
  hard: 2,
}

/**
 * Flip budget per difficulty (SPEC):
 * Easy: 4× cards, Medium: 3× cards, Hard: 2× cards
 */
export function getMaxFlips(
  difficulty: Difficulty,
  totalCards: number,
): number {
  return totalCards * FLIP_MULTIPLIERS[difficulty]
}

export function getFlipMultiplier(difficulty: Difficulty): number {
  return FLIP_MULTIPLIERS[difficulty]
}

export const DIFFICULTY_LABELS: Record<
  Difficulty,
  { title: string; description: string }
> = {
  easy: {
    title: 'Easy',
    description: '4× card count — generous practice mode',
  },
  medium: {
    title: 'Medium',
    description: '3× card count — balanced challenge',
  },
  hard: {
    title: 'Hard',
    description: '2× card count — tight flip limit',
  },
}
