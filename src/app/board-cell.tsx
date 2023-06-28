import styles from './board-cell.module.css';

export interface BoardCellProps {
  shotted: boolean;
  hasShip: boolean;
  showShip: boolean;
  onCellClick: () => void;
}

function BoardCell({
  shotted,
  hasShip,
  showShip,
  onCellClick,
}: BoardCellProps) {
  const shipClass = hasShip ? styles['has-ship'] : '';
  const showShipClass = showShip && hasShip ? styles['show-ship'] : '';
  const shottedClass = shotted ? styles['shotted'] : '';
  const buttonText = hasShip ? 'X' : 'O';
  return (
    <button
      className={`${styles['cell']} ${shipClass} ${showShipClass} ${shottedClass}`}
      onClick={onCellClick}
    >
      {shotted && buttonText}
    </button>
  );
}

export default BoardCell;
