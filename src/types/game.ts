export type Difficulty = 'easy' | 'medium' | 'hard'

export type GamePhase = 'menu' | 'playing' | 'won' | 'lost'

export interface CardImage {
  id: string
  label: string
  emoji: string
  gradient: string
}

export interface GameCard {
  id: string
  pairId: string
  imageId: string
  isFlipped: boolean
  isMatched: boolean
  isRemoved: boolean
}

export interface GameState {
  phase: GamePhase
  difficulty: Difficulty | null
  cards: GameCard[]
  remainingFlips: number
  firstUnmatchedId: string | null
  isComparing: boolean
}
