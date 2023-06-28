import styles from './game-info.module.css';
import { Ship, getShipsInfo, hasGameFinished } from './utils';

export interface GameInfoProps {
  ships: Ship[];
  shots: boolean[];
}

export function GameInfo({ ships, shots }: GameInfoProps) {
  const gameFinished = hasGameFinished(ships, shots);
  const shipsInfo = getShipsInfo(ships, shots).map((shipInfo, index) => {
    return (
      <div key={index} className={shipInfo.isShunk ? styles['shunk'] : ''}>
        {shipInfo.type}
      </div>
    );
  });

  return (
    <div className={styles['text']}>
      {shipsInfo}
      {gameFinished && 'Game Finished!'}
    </div>
  );
}

export default GameInfo;
