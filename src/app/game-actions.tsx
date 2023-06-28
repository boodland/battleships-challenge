import { memo } from 'react';
import styles from './game-actions.module.css';

const CHECKBOX_LABEL = 'Show ships';

export interface GameActionsProps {
  showShips: boolean;
  onRestartGame: () => void;
  onToggleShowShips: () => void;
}

const GameActionsMemoized = memo(
  ({ showShips, onRestartGame, onToggleShowShips }: GameActionsProps) => {
    return (
      <div className={styles['actions']}>
        <button onClick={onRestartGame}>Restart</button>
        <div onClick={onToggleShowShips}>
          <input
            type="checkbox"
            checked={showShips}
            name={CHECKBOX_LABEL}
            readOnly
          />
          {CHECKBOX_LABEL}
        </div>
      </div>
    );
  }
);

export default GameActionsMemoized;
