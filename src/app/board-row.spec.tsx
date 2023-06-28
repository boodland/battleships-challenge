import { render } from '@testing-library/react';

import BoardRow from './board-row';

describe('BoardRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BoardRow
        startPosition={0}
        ships={[]}
        shots={[]}
        showShips={false}
        onCellClick={(position: number) => null}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
