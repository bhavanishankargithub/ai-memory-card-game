import type { CardImage } from '../types/game'

/** Unique card faces — each appears exactly twice on the board */
export const CARD_IMAGES: CardImage[] = [
  {
    id: 'star',
    label: 'Star',
    emoji: '⭐',
    gradient: 'from-amber-400 to-orange-600',
  },
  {
    id: 'moon',
    label: 'Moon',
    emoji: '🌙',
    gradient: 'from-indigo-400 to-violet-700',
  },
  {
    id: 'fire',
    label: 'Fire',
    emoji: '🔥',
    gradient: 'from-red-400 to-rose-600',
  },
  {
    id: 'leaf',
    label: 'Leaf',
    emoji: '🍃',
    gradient: 'from-emerald-400 to-green-700',
  },
  {
    id: 'gem',
    label: 'Gem',
    emoji: '💎',
    gradient: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'bolt',
    label: 'Bolt',
    emoji: '⚡',
    gradient: 'from-yellow-300 to-amber-500',
  },
  {
    id: 'heart',
    label: 'Heart',
    emoji: '💖',
    gradient: 'from-pink-400 to-fuchsia-600',
  },
  {
    id: 'rocket',
    label: 'Rocket',
    emoji: '🚀',
    gradient: 'from-sky-400 to-indigo-600',
  },
]
