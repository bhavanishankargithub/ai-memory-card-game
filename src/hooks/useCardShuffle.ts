import { useCallback, useState } from 'react'
import type { GameCard } from '../types/game'
import { createShuffledDeck, resetCardIdCounter } from '../utils/cards'

/** Generates a fresh randomized deck whenever a new game starts */
export function useCardShuffle() {
  const [deck, setDeck] = useState<GameCard[]>([])

  const generateDeck = useCallback(() => {
    resetCardIdCounter()
    const newDeck = createShuffledDeck()
    setDeck(newDeck)
    return newDeck
  }, [])

  return { deck, setDeck, generateDeck }
}
