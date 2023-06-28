import { render } from '@testing-library/react';

import BoardCell from './board-cell';

describe('BoardCell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BoardCell
        shotted={false}
        hasShip={false}
        showShip={false}
        onCellClick={() => null}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
