import { useCallback, useState } from 'react'
import type { GameCard } from '../types/game'
import { createShuffledDeck, resetCardIdCounter } from '../utils/cards'

/** Generates a fresh randomized deck for the requested card count */
export function useCardShuffle() {
  const [deck, setDeck] = useState<GameCard[]>([])

  const generateDeck = useCallback((totalCards: number) => {
    resetCardIdCounter()
    const newDeck = createShuffledDeck(totalCards)
    setDeck(newDeck)
    return newDeck
  }, [])

  return { deck, setDeck, generateDeck }
}
