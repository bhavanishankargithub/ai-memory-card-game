import { motion } from 'framer-motion'
import { CARD_IMAGES } from '../assets/cardImages'
import type { GameCard } from '../types/game'
import { MATCH_POP_ANIMATION_MS } from '../utils/difficulty'

interface CardProps {
  card: GameCard
  disabled: boolean
  onClick: (id: string) => void
}

export function Card({ card, disabled, onClick }: CardProps) {
  const image = CARD_IMAGES.find((img) => img.id === card.imageId)

  if (card.isRemoved) {
    return null
  }

  const isFaceUp = card.isFlipped || card.isMatched
  const isClickable = !disabled && !isFaceUp && !card.isMatched

  return (
    <motion.div
      layout
      initial={false}
      animate={
        card.isMatched
          ? { scale: [1, 1.12, 0], opacity: [1, 1, 0], rotate: [0, 6, -6, 0] }
          : { scale: 1, opacity: 1 }
      }
      transition={
        card.isMatched
          ? {
              duration: MATCH_POP_ANIMATION_MS / 1000,
              ease: 'easeOut',
            }
          : { type: 'spring', stiffness: 260, damping: 22 }
      }
      className="aspect-square w-full"
    >
      <button
        type="button"
        aria-label={
          isFaceUp
            ? `Card showing ${image?.label ?? 'image'}`
            : 'Hidden memory card'
        }
        disabled={!isClickable}
        onClick={() => onClick(card.id)}
        className={`group relative h-full w-full perspective-[1000px] ${
          isClickable ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFaceUp ? 180 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Card back */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-violet-400/40 bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg shadow-violet-500/10 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-3xl font-bold text-violet-300/90 sm:text-4xl">
              ?
            </span>
          </div>

          {/* Card front */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-white/20 bg-gradient-to-br ${image?.gradient ?? 'from-slate-500 to-slate-700'} shadow-lg backface-hidden`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <span className="text-4xl sm:text-5xl" role="img" aria-hidden>
              {image?.emoji}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-white/90 sm:text-sm">
              {image?.label}
            </span>
          </div>
        </motion.div>

        {isClickable && (
          <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition group-hover:ring-2 group-hover:ring-violet-400/60" />
        )}
      </button>
    </motion.div>
  )
}
