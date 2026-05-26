export type Difficulty = 'easy' | 'medium' | 'hard'

export type GamePhase = 'menu' | 'setup' | 'playing' | 'won' | 'lost'

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

export interface GameConfig {
  difficulty: Difficulty
  totalCards: number
}
