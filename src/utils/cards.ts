import { CARD_IMAGES } from '../assets/cardImages'
import type { GameCard } from '../types/game'
import { MAX_PAIRS } from './cardCount'
import { shuffle } from './shuffle'

let cardIdCounter = 0

function nextCardId(): string {
  cardIdCounter += 1
  return `card-${cardIdCounter}`
}

/** Build paired cards for the requested total, then shuffle positions */
export function createShuffledDeck(totalCards: number): GameCard[] {
  const pairCount = totalCards / 2

  if (pairCount > MAX_PAIRS || pairCount > CARD_IMAGES.length) {
    throw new Error(
      `Cannot create ${totalCards} cards: maximum supported is ${MAX_PAIRS * 2}`,
    )
  }

  const images = shuffle(CARD_IMAGES.slice(0, pairCount))

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
