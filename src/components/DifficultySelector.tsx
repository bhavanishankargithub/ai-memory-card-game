import { motion } from 'framer-motion'
import type { Difficulty } from '../types/game'
import { DIFFICULTY_LABELS } from '../utils/difficulty'

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void
}

const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

export function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-lg px-4"
    >
      <h2 className="mb-2 text-center text-xl font-semibold text-white">
        Choose difficulty
      </h2>
      <p className="mb-8 text-center text-sm text-slate-400">
        Match all pairs before you run out of flips
      </p>

      <div className="flex flex-col gap-3">
        {difficulties.map((level, index) => {
          const { title, description } = DIFFICULTY_LABELS[level]
          return (
            <motion.button
              key={level}
              type="button"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(level)}
              className="rounded-2xl border border-slate-600 bg-slate-800/90 px-6 py-4 text-left shadow-lg transition hover:border-violet-400/60 hover:bg-slate-700/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <span className="block text-lg font-bold text-white">{title}</span>
              <span className="mt-1 block text-sm text-slate-400">
                {description}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.section>
  )
}
