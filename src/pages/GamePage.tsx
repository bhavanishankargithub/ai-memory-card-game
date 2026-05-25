import { DifficultySelector } from '../components/DifficultySelector'
import { GameBoard } from '../components/GameBoard'
import { GameOverModal } from '../components/GameOverModal'
import { Header } from '../components/Header'
import { WinModal } from '../components/WinModal'
import { useGameLogic } from '../hooks/useGameLogic'

export function GamePage() {
  const {
    phase,
    difficulty,
    cards,
    remainingFlips,
    isComparing,
    startGame,
    returnToMenu,
    restartGame,
    handleCardClick,
  } = useGameLogic()

  const isPlaying = phase === 'playing'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto min-h-screen max-w-4xl pb-12">
        <Header
          remainingFlips={remainingFlips}
          difficulty={difficulty}
          onRestart={restartGame}
          showStats={isPlaying}
        />

        <main className="mt-4">
          {phase === 'menu' && (
            <DifficultySelector onSelect={startGame} />
          )}

          {isPlaying && (
            <GameBoard
              cards={cards}
              isComparing={isComparing}
              onCardClick={handleCardClick}
            />
          )}
        </main>

        {phase === 'won' && (
          <WinModal
            remainingFlips={remainingFlips}
            onPlayAgain={restartGame}
            onChangeDifficulty={returnToMenu}
          />
        )}

        {phase === 'lost' && (
          <GameOverModal
            onTryAgain={restartGame}
            onChangeDifficulty={returnToMenu}
          />
        )}
      </div>
    </div>
  )
}
