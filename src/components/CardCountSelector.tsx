import { motion } from 'framer-motion'
import { useMemo, useState, type FormEvent } from 'react'
import type { Difficulty } from '../types/game'
import {
  DEFAULT_CARD_COUNT,
  MAX_CARDS,
  MIN_CARDS,
  validateCardCount,
} from '../utils/cardCount'
import { getFlipMultiplier } from '../utils/difficulty'

interface CardCountSelectorProps {
  difficulty: Difficulty
  onStart: (totalCards: number) => void
  onBack: () => void
}

export function CardCountSelector({
  difficulty,
  onStart,
  onBack,
}: CardCountSelectorProps) {
  const [inputValue, setInputValue] = useState(String(DEFAULT_CARD_COUNT))
  const [touched, setTouched] = useState(false)

  const parsed = useMemo(() => {
    const trimmed = inputValue.trim()
    if (trimmed === '') return Number.NaN
    return Number.parseInt(trimmed, 10)
  }, [inputValue])

  const validation = useMemo(() => validateCardCount(parsed), [parsed])

  const previewFlips =
    validation.normalized !== null
      ? validation.normalized * getFlipMultiplier(difficulty)
      : null

  const showError = touched && !validation.valid

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (validation.valid && validation.normalized !== null) {
      onStart(validation.normalized)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-lg px-4"
    >
      <h2 className="mb-2 text-center text-xl font-semibold text-white">
        Choose card count
      </h2>
      <p className="mb-6 text-center text-sm text-slate-400">
        Even number between {MIN_CARDS} and {MAX_CARDS}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="card-count"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Total cards
          </label>
          <input
            id="card-count"
            type="number"
            inputMode="numeric"
            min={MIN_CARDS}
            max={MAX_CARDS}
            step={2}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showError}
            aria-describedby={showError ? 'card-count-error' : 'card-count-hint'}
            className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-lg font-semibold text-white shadow-inner transition focus:outline-none focus-visible:ring-2 ${
              showError
                ? 'border-rose-500 focus-visible:ring-rose-400'
                : 'border-slate-600 focus-visible:ring-violet-400'
            }`}
          />
          <p id="card-count-hint" className="mt-2 text-xs text-slate-500">
            Default is {DEFAULT_CARD_COUNT} cards ({DEFAULT_CARD_COUNT / 2}{' '}
            pairs)
          </p>
          {showError && validation.error && (
            <p
              id="card-count-error"
              role="alert"
              className="mt-2 text-sm font-medium text-rose-400"
            >
              {validation.error}
            </p>
          )}
        </div>

        {previewFlips !== null && validation.valid && (
          <p className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-center text-sm text-violet-200">
            You will have{' '}
            <span className="font-bold text-white">{previewFlips}</span> flips
            for this game
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!validation.valid}
            className="flex-1 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start game
          </button>
        </div>
      </form>
    </motion.section>
  )
}
