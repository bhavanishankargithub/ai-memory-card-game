import { CardCountSelector } from '../components/CardCountSelector'
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
    totalCards,
    cards,
    remainingFlips,
    isComparing,
    selectDifficulty,
    startGame,
    returnToMenu,
    backToDifficulty,
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
          totalCards={totalCards}
          onRestart={restartGame}
          showStats={isPlaying}
        />

        <main className="mt-4">
          {phase === 'menu' && (
            <DifficultySelector onSelect={selectDifficulty} />
          )}

          {phase === 'setup' && difficulty && (
            <CardCountSelector
              difficulty={difficulty}
              onStart={(count) => startGame(difficulty, count)}
              onBack={backToDifficulty}
            />
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
