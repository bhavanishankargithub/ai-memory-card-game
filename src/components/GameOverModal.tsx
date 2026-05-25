import { motion } from 'framer-motion'
import { ModalActions, ModalShell } from './Modal'

interface GameOverModalProps {
  onTryAgain: () => void
  onChangeDifficulty: () => void
}

export function GameOverModal({
  onTryAgain,
  onChangeDifficulty,
}: GameOverModalProps) {
  return (
    <ModalShell>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <p className="text-5xl" role="img" aria-hidden>
          💫
        </p>
        <h2 className="mt-4 text-2xl font-bold text-white">Out of flips!</h2>
        <p className="mt-2 text-slate-300">
          You ran out of moves before matching every pair. Try again?
        </p>
        <ModalActions
          primaryLabel="Try again"
          onPrimary={onTryAgain}
          onSecondary={onChangeDifficulty}
        />
      </motion.div>
    </ModalShell>
  )
}
