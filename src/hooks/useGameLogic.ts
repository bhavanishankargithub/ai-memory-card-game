import { useCallback, useState } from 'react'
import type { Difficulty, GameCard, GamePhase } from '../types/game'
import {
  getMaxFlips,
  MATCH_POP_ANIMATION_MS,
  MATCH_WAIT_MS,
  PAIR_MISMATCH_REVEAL_MS,
  SINGLE_CARD_REVEAL_MS,
} from '../utils/difficulty'
import { useCardShuffle } from './useCardShuffle'
import { useTimer } from './useTimer'

function allMatched(cards: GameCard[]): boolean {
  return cards.length > 0 && cards.every((c) => c.isMatched || c.isRemoved)
}

function updateCard(
  cards: GameCard[],
  cardId: string,
  patch: Partial<GameCard>,
): GameCard[] {
  return cards.map((c) => (c.id === cardId ? { ...c, ...patch } : c))
}

function flipBackPair(
  cards: GameCard[],
  firstId: string,
  secondId: string,
): GameCard[] {
  return cards.map((c) =>
    c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c,
  )
}

export function useGameLogic() {
  const [phase, setPhase] = useState<GamePhase>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [remainingFlips, setRemainingFlips] = useState(0)
  const [firstUnmatchedId, setFirstUnmatchedId] = useState<string | null>(null)
  const [isComparing, setIsComparing] = useState(false)

  const { deck, setDeck, generateDeck } = useCardShuffle()
  const { schedule, clearScheduled } = useTimer()

  const checkEndGame = useCallback(
    (cards: GameCard[], flipsLeft: number) => {
      if (allMatched(cards)) {
        setPhase('won')
        return
      }
      if (flipsLeft <= 0) {
        setPhase('lost')
      }
    },
    [],
  )

  const resetInteractionState = useCallback(() => {
    setFirstUnmatchedId(null)
    setIsComparing(false)
  }, [])

  const startGame = useCallback(
    (selected: Difficulty) => {
      clearScheduled()
      const newDeck = generateDeck()
      setDifficulty(selected)
      setRemainingFlips(getMaxFlips(selected))
      resetInteractionState()
      setPhase('playing')
      setDeck(newDeck)
    },
    [clearScheduled, generateDeck, resetInteractionState, setDeck],
  )

  const returnToMenu = useCallback(() => {
    clearScheduled()
    setPhase('menu')
    setDifficulty(null)
    resetInteractionState()
    setDeck([])
  }, [clearScheduled, resetInteractionState, setDeck])

  const restartGame = useCallback(() => {
    if (difficulty) {
      startGame(difficulty)
    }
  }, [difficulty, startGame])

  /** Auto flip-back when only one card is revealed and no second pick arrives */
  const scheduleSingleCardFlipBack = useCallback(
    (cardId: string, flipsLeft: number) => {
      schedule(() => {
        setDeck((current) => {
          const reset = updateCard(current, cardId, { isFlipped: false })
          checkEndGame(reset, flipsLeft)
          return reset
        })
        setFirstUnmatchedId(null)
      }, SINGLE_CARD_REVEAL_MS)
    },
    [schedule, checkEndGame, setDeck],
  )

  const handleCardClick = useCallback(
    (cardId: string) => {
      if (phase !== 'playing' || isComparing) return

      const card = deck.find((c) => c.id === cardId)
      if (
        !card ||
        card.isRemoved ||
        card.isMatched ||
        card.isFlipped ||
        cardId === firstUnmatchedId
      ) {
        return
      }

      if (remainingFlips <= 0) return

      const flipsAfterClick = remainingFlips - 1
      setRemainingFlips(flipsAfterClick)

      const nextCards = updateCard(deck, cardId, { isFlipped: true })

      // First card: remember it and start the 5s solo reveal timer
      if (!firstUnmatchedId) {
        clearScheduled()
        setDeck(nextCards)
        setFirstUnmatchedId(cardId)
        scheduleSingleCardFlipBack(cardId, flipsAfterClick)
        checkEndGame(nextCards, flipsAfterClick)
        return
      }

      // Second card: cancel solo timer, lock input during pair resolution
      clearScheduled()
      setIsComparing(true)

      const firstId = firstUnmatchedId
      const first = nextCards.find((c) => c.id === firstId)
      const second = nextCards.find((c) => c.id === cardId)

      if (!first || !second) {
        resetInteractionState()
        return
      }

      setDeck(nextCards)

      if (first.pairId === second.pairId) {
        // Match: 1.5s visible, then pop animation, then remove
        schedule(() => {
          setDeck((current) =>
            current.map((c) =>
              c.id === firstId || c.id === cardId
                ? { ...c, isMatched: true, isFlipped: true }
                : c,
            ),
          )

          schedule(() => {
            setDeck((current) => {
              const removed = current.map((c) =>
                c.id === firstId || c.id === cardId
                  ? { ...c, isRemoved: true }
                  : c,
              )
              checkEndGame(removed, flipsAfterClick)
              return removed
            })
            resetInteractionState()
          }, MATCH_POP_ANIMATION_MS)
        }, MATCH_WAIT_MS)
      } else {
        // Mismatch: both stay visible 3s, then flip back
        schedule(() => {
          setDeck((current) => {
            const reset = flipBackPair(current, firstId, cardId)
            checkEndGame(reset, flipsAfterClick)
            return reset
          })
          resetInteractionState()
        }, PAIR_MISMATCH_REVEAL_MS)
      }
    },
    [
      phase,
      isComparing,
      deck,
      firstUnmatchedId,
      remainingFlips,
      schedule,
      clearScheduled,
      checkEndGame,
      setDeck,
      scheduleSingleCardFlipBack,
      resetInteractionState,
    ],
  )

  return {
    phase,
    difficulty,
    cards: deck,
    remainingFlips,
    isComparing,
    startGame,
    returnToMenu,
    restartGame,
    handleCardClick,
  }
}
