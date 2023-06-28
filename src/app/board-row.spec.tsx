import { render } from '@testing-library/react';

import BoardRow from './board-row';

vi.mock('./utils', () => {
  return { hasShip: () => true, columns: [1, 2, 3, 4, 5] };
});
vi.mock('./board-cell', () => ({ default: (props: unknown) => `MockedBoardCell ${JSON.stringify(props)}` }));

const onCellClick = (position: number) => null;

describe('BoardRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BoardRow
        startPosition={0}
        ships={[]}
        shots={[]}
        showShips={false}
        onCellClick={onCellClick}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display one BoardCell per column', () => {
    const { container } = render(
      <BoardRow
        startPosition={0}
        ships={[]}
        shots={[]}
        showShips={false}
        onCellClick={onCellClick}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should pass the correct params to BoardCells', () => {
    const { container } = render(
      <BoardRow
        startPosition={0}
        ships={[]}
        shots={[false, true, false, true, true]}
        showShips={true}
        onCellClick={onCellClick}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
