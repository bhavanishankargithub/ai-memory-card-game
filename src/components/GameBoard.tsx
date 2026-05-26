import { AnimatePresence } from 'framer-motion'
import type { GameCard } from '../types/game'
import { getGridColumns } from '../utils/cardCount'
import { Card } from './Card'

interface GameBoardProps {
  cards: GameCard[]
  isComparing: boolean
  onCardClick: (id: string) => void
}

export function GameBoard({ cards, isComparing, onCardClick }: GameBoardProps) {
  const visibleCards = cards.filter((c) => !c.isRemoved)
  const columns = getGridColumns(visibleCards.length)

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div
        className="grid gap-2 sm:gap-3 md:gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        <AnimatePresence mode="popLayout">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              disabled={isComparing}
              onClick={onCardClick}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
