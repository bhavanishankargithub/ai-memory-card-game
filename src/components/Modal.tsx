import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function ModalShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-600 bg-slate-900 p-8 shadow-2xl shadow-violet-500/20">
        {children}
      </div>
    </motion.div>
  )
}

interface ModalActionsProps {
  primaryLabel: string
  onPrimary: () => void
  onSecondary: () => void
}

export function ModalActions({
  primaryLabel,
  onPrimary,
  onSecondary,
}: ModalActionsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <button
        type="button"
        onClick={onPrimary}
        className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        onClick={onSecondary}
        className="rounded-xl border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        Change difficulty
      </button>
    </div>
  )
}
