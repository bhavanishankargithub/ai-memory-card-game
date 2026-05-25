import { motion } from 'framer-motion'
import { ModalActions, ModalShell } from './Modal'

interface WinModalProps {
  remainingFlips: number
  onPlayAgain: () => void
  onChangeDifficulty: () => void
}

export function WinModal({
  remainingFlips,
  onPlayAgain,
  onChangeDifficulty,
}: WinModalProps) {
  return (
    <ModalShell>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <p className="text-5xl" role="img" aria-hidden>
          🎉
        </p>
        <h2 className="mt-4 text-2xl font-bold text-white">You won!</h2>
        <p className="mt-2 text-slate-300">
          All pairs matched with{' '}
          <span className="font-semibold text-violet-300">
            {remainingFlips}
          </span>{' '}
          flips remaining.
        </p>
        <ModalActions
          primaryLabel="Play again"
          onPrimary={onPlayAgain}
          onSecondary={onChangeDifficulty}
        />
      </motion.div>
    </ModalShell>
  )
}
