export const MIN_CARDS = 2
export const MAX_CARDS = 50
export const DEFAULT_CARD_COUNT = 10
export const MAX_PAIRS = MAX_CARDS / 2

export interface CardCountValidation {
  valid: boolean
  error: string | null
  normalized: number | null
}

export function validateCardCount(raw: number): CardCountValidation {
  if (!Number.isFinite(raw) || !Number.isInteger(raw)) {
    return {
      valid: false,
      error: 'Enter a whole number',
      normalized: null,
    }
  }

  if (raw < MIN_CARDS) {
    return {
      valid: false,
      error: `Minimum is ${MIN_CARDS} cards`,
      normalized: null,
    }
  }

  if (raw > MAX_CARDS) {
    return {
      valid: false,
      error: `Maximum is ${MAX_CARDS} cards`,
      normalized: null,
    }
  }

  if (raw % 2 !== 0) {
    return {
      valid: false,
      error: 'Card count must be even',
      normalized: null,
    }
  }

  return { valid: true, error: null, normalized: raw }
}

/** Responsive grid columns based on total cards */
export function getGridColumns(totalCards: number): number {
  if (totalCards <= 4) return 2
  if (totalCards <= 12) return 4
  if (totalCards <= 24) return 6
  if (totalCards <= 40) return 8
  return 10
}
