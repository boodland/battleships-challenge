import { render } from '@testing-library/react';

import Board from './board';
import { BoardRowProps } from './board-row';

vi.mock('./utils', () => {
  return { rows: [0, 1, 2, 3, 4], columns: ['A', 'B', 'C', 'D', 'E'] };
});
vi.mock('./board-row', () => ({
  default: (props: BoardRowProps) =>
    `MockedBoardRow ${JSON.stringify(props)} onCellClick: ${
      props.onCellClick.name
    }`,
}));

const onShot = (position: number) => null;

describe('Board', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Board ships={[]} shots={[]} showShips={false} onShot={onShot} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display columns row', () => {
    const { container } = render(
      <Board ships={[]} shots={[]} showShips={false} onShot={onShot} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display one BoardRow per row', () => {
    const { container } = render(
      <Board ships={[]} shots={[]} showShips={false} onShot={onShot} />
    );
    expect(container).toMatchSnapshot();
  });
});
