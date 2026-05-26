import { useCallback, useState } from 'react'
import type { Difficulty, GameCard, GamePhase } from '../types/game'
import { DEFAULT_CARD_COUNT, validateCardCount } from '../utils/cardCount'
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
  const [totalCards, setTotalCards] = useState(DEFAULT_CARD_COUNT)
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
    (selectedDifficulty: Difficulty, cardCount: number) => {
      const validation = validateCardCount(cardCount)
      if (!validation.valid || validation.normalized === null) {
        return false
      }

      const count = validation.normalized
      clearScheduled()
      const newDeck = generateDeck(count)
      setDifficulty(selectedDifficulty)
      setTotalCards(count)
      setRemainingFlips(getMaxFlips(selectedDifficulty, count))
      resetInteractionState()
      setPhase('playing')
      setDeck(newDeck)
      return true
    },
    [clearScheduled, generateDeck, resetInteractionState, setDeck],
  )

  const selectDifficulty = useCallback((selected: Difficulty) => {
    clearScheduled()
    setDifficulty(selected)
    resetInteractionState()
    setDeck([])
    setPhase('setup')
  }, [clearScheduled, resetInteractionState, setDeck])

  const returnToMenu = useCallback(() => {
    clearScheduled()
    setPhase('menu')
    setDifficulty(null)
    setTotalCards(DEFAULT_CARD_COUNT)
    resetInteractionState()
    setDeck([])
  }, [clearScheduled, resetInteractionState, setDeck])

  const backToDifficulty = useCallback(() => {
    clearScheduled()
    setDifficulty(null)
    resetInteractionState()
    setDeck([])
    setPhase('menu')
  }, [clearScheduled, resetInteractionState, setDeck])

  const restartGame = useCallback(() => {
    if (difficulty) {
      startGame(difficulty, totalCards)
    }
  }, [difficulty, totalCards, startGame])

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

      if (!firstUnmatchedId) {
        clearScheduled()
        setDeck(nextCards)
        setFirstUnmatchedId(cardId)
        scheduleSingleCardFlipBack(cardId, flipsAfterClick)
        checkEndGame(nextCards, flipsAfterClick)
        return
      }

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
    totalCards,
    cards: deck,
    remainingFlips,
    isComparing,
    selectDifficulty,
    startGame,
    returnToMenu,
    backToDifficulty,
    restartGame,
    handleCardClick,
  }
}
