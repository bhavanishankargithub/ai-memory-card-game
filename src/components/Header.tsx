import type { Difficulty } from '../types/game'
import { DIFFICULTY_LABELS } from '../utils/difficulty'

interface HeaderProps {
  remainingFlips: number
  difficulty: Difficulty | null
  totalCards: number
  onRestart: () => void
  showStats: boolean
}

export function Header({
  remainingFlips,
  difficulty,
  totalCards,
  onRestart,
  showStats,
}: HeaderProps) {
  return (
    <header className="flex flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:py-8">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Memory Match
        </h1>
        {showStats && difficulty && (
          <p className="mt-1 text-sm text-slate-400">
            {DIFFICULTY_LABELS[difficulty].title} · {totalCards} cards (
            {totalCards / 2} pairs)
          </p>
        )}
      </div>

      {showStats && (
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
          <div
            className="rounded-xl border border-violet-500/30 bg-slate-800/80 px-5 py-2 text-center shadow-lg shadow-violet-500/10"
            aria-live="polite"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
              Flips left
            </p>
            <p className="text-2xl font-bold tabular-nums text-white">
              {remainingFlips}
            </p>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-violet-400 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Restart
          </button>
        </div>
      )}
    </header>
  )
}
