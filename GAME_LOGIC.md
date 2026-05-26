# Game Logic

## Game Flow

1. Select difficulty
2. Generate shuffled card pairs
3. Display hidden cards
4. User clicks card
5. Reveal card
6. Compare with previous unmatched card
7. If match:
   - Remove both cards
8. Else:
   - Flip back after delay
9. Decrease flips on every click
10. Check win/loss conditions

---

## Matching Rules

- Only two cards can be active at once
- Ignore clicks while cards are comparing
- Prevent clicking already matched cards
- Prevent double-clicking same card

---

## Flip Counting

Each card click reduces remaining flips by 1.

---

## Difficulty Flip Multipliers

Easy:
- Remaining flips = total cards × 4

Medium:
- Remaining flips = total cards × 3

Hard:
- Remaining flips = total cards × 2

---

## Card Count Input Rules

- User selects difficulty first
- Then user selects total number of cards
- Default card count is 10
- Total card count must always be even
- Prevent invalid values

---

## Timing Rules

### Single Card Flip

If only one card is flipped:
- Keep the card visible for 5 seconds
- If no second card is selected within 5 seconds:
  - Automatically flip the card back

---

### Two Cards Flipped

When the second card is flipped:
- Keep both cards visible for 3 seconds

If cards do not match:
- Flip both cards back after 3 seconds

If cards match:
- Wait 1.5 seconds
- Play disappear/pop animation
- Remove cards from board

---

## Interaction Rules

- Prevent additional card clicks while comparison is in progress
- Prevent clicking already matched cards
- Prevent clicking the same card twice

---

## Win Condition

All cards matched.

---

## Loss Condition

Remaining flips reach zero before all matches are complete.