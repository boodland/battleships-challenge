import BoardCell from './board-cell';
import { Ship, columns, hasShip } from './utils';

export interface BoardRowProps {
  startPosition: number;
  ships: Ship[];
  shots: boolean[];
  showShips: boolean;
  onCellClick: (index: number) => void;
}

function BoardRow({
  startPosition,
  ships,
  shots,
  showShips,
  onCellClick,
}: BoardRowProps) {
  const boardRowSquares = columns.map(
    (column, index) => index + startPosition * 10
  );
  return (
    <>
      {boardRowSquares.map((position) => (
        <BoardCell
          key={position}
          shotted={shots[position]}
          hasShip={hasShip(ships, position)}
          showShip={showShips}
          onCellClick={() => onCellClick(position)}
        />
      ))}
    </>
  );
}

export default BoardRow;
