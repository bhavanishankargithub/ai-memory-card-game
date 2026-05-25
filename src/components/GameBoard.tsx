import { AnimatePresence } from 'framer-motion'
import type { GameCard } from '../types/game'
import { Card } from './Card'

interface GameBoardProps {
  cards: GameCard[]
  isComparing: boolean
  onCardClick: (id: string) => void
}

export function GameBoard({ cards, isComparing, onCardClick }: GameBoardProps) {
  const visibleCards = cards.filter((c) => !c.isRemoved)

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
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
