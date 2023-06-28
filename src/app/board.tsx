import BoardRow from './board-row';
import styles from './board.module.css';
import { Ship, columns, rows } from './utils';

export interface BoardProps {
  ships: Ship[];
  shots: boolean[];
  showShips: boolean;
  onShot: (position: number) => void;
}

const boardColumnsRow = (
  <div className={styles['columns']}>
    {columns.map((column) => (
      <span key={column} className={styles['text']}>
        {column}
      </span>
    ))}
  </div>
); 

function Board({ ships, shots, showShips, onShot }: BoardProps) {
  
  const boardCellRows = rows.map((position) => {
    return (
      <div key={position}>
        <span className={styles['text']}>{position + 1}</span>
        <BoardRow
          key={position}
          startPosition={position}
          ships={ships}
          shots={shots}
          showShips={showShips}
          onCellClick={onShot}
        />
      </div>
    );
  });

  return (
    <>
      {boardColumnsRow}
      {boardCellRows}
    </>
  );
}

export default Board;
