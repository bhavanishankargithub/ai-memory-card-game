import { CARD_IMAGES } from '../assets/cardImages'
import type { GameCard } from '../types/game'
import { PAIR_COUNT } from './difficulty'
import { shuffle } from './shuffle'

let cardIdCounter = 0

function nextCardId(): string {
  cardIdCounter += 1
  return `card-${cardIdCounter}`
}

/** Build paired cards, shuffle images and positions for a new round */
export function createShuffledDeck(): GameCard[] {
  const images = shuffle(CARD_IMAGES.slice(0, PAIR_COUNT))

  const pairs = images.flatMap((image) => {
    const pairId = image.id
    return [0, 1].map(() => ({
      id: nextCardId(),
      pairId,
      imageId: image.id,
      isFlipped: false,
      isMatched: false,
      isRemoved: false,
    }))
  })

  return shuffle(pairs)
}

export function resetCardIdCounter(): void {
  cardIdCounter = 0
}
