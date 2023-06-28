import { render } from '@testing-library/react';

import Game from './game';
import { BoardProps } from './board';
import { GameActionsProps } from './game-actions';
import { GameInfoProps } from './game-info';

const mocks = vi.hoisted(() => {
  return {
    hasGameFinished: vi.fn().mockReturnValue(false),
  }
})

vi.mock('./utils', () => {
  return {
    generateShips: () => [
      { type: 'Type 1', positions: [0, 1] },
      { type: 'Type 2', positions: [7, 8, 9] },
    ],
    initShots: () => Array(10).fill(false),
    hasGameFinished: mocks.hasGameFinished,
  };
});

vi.mock('./board', () => ({
  default: (props: BoardProps) =>
    `MockedBoard ${JSON.stringify(props)} onShot: ${props.onShot.name}`,
}));

vi.mock('./game-actions', () => ({
  default: (props: GameActionsProps) =>
    `MockedGameActions ${JSON.stringify(props)} onRestartGame: ${
      props.onRestartGame.name
    } onToggleShowShips: ${props.onToggleShowShips.name}`,
}));

vi.mock('./game-info', () => ({
  default: (props: GameInfoProps) => `MockedGameInfo ${JSON.stringify(props)}`,
}));

describe('Game', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Game />);
    expect(baseElement).toBeTruthy();
  });

  it('should display Board component', () => {
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('should display GameActions component', () => {
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('should display GameInfo component', () => {
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('should block board if game has finished', () => {
    mocks.hasGameFinished.mockReturnValue(true);
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });
});
