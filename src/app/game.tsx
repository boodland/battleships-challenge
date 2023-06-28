import styles from './game.module.css';
import { useCallback, useState } from 'react';
import Board from './board';
import { generateShips, hasGameFinished, initShots } from './utils';
import GameInfo from './game-info';
import GameActionsMemoized from './game-actions';

function Game() {
  const [ships, setShips] = useState(generateShips());
  const [shots, setShots] = useState(initShots());
  const [showShips, setShowShips] = useState(false);

  const restartGameCallback = useCallback(function restartGame() {
    setShips(generateShips());
    setShots(initShots);
  }, []);

  const toggleShowShipsCallback = useCallback(
    function toggleShowShips() {
      setShowShips((previousValue) => !previousValue);
    },
    []
  );

  function onShot(position: number) {
    const newShots = [...shots];
    newShots[position] = true;
    setShots(newShots);
  }

  const hasFinished = hasGameFinished(ships, shots);

  return (
    <div className={styles['game']}>
      <div className={hasFinished ? styles['blocked'] : ''}>
        <Board
          shots={shots}
          ships={ships}
          showShips={showShips}
          onShot={onShot}
        />
      </div>
      <div className={styles['right-panel']}>
        <GameActionsMemoized
          showShips={showShips}
          onRestartGame={restartGameCallback}
          onToggleShowShips={toggleShowShipsCallback}
        />
        <GameInfo shots={shots} ships={ships} />
      </div>
    </div>
  );
}

export default Game;
