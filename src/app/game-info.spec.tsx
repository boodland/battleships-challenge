import { render } from '@testing-library/react';

import GameInfo from './game-info';

const mocks = vi.hoisted(() => {
  return {
    hasGameFinished: vi.fn().mockReturnValue(false),
    getShipsInfo: vi.fn().mockReturnValue([
      {type: 'Type 1', isShunk: false},
      {type: 'Type 2', isShunk: false},
    ]),
  }
})

vi.mock('./utils', () => {
  return { hasGameFinished: mocks.hasGameFinished, getShipsInfo: mocks.getShipsInfo};
});

describe('GameInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameInfo ships={[]} shots={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display ships type', () => {
    const { container } = render(<GameInfo ships={[]} shots={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should display ships type crossed if is shunk', () => {
    const shipsInfoShunk = [
      {type: 'Type 1', isShunk: true},
      {type: 'Type 2', isShunk: true},
    ]
    mocks.getShipsInfo.mockReturnValue(shipsInfoShunk)
    const { container } = render(<GameInfo ships={[]} shots={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should display Game Finished! if game has finished', () => {
    mocks.hasGameFinished.mockReturnValue(true);
    const { container } = render(<GameInfo ships={[]} shots={[]} />);
    expect(container).toMatchSnapshot();
  });
});
