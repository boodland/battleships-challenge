import { render } from '@testing-library/react';

import GameActions from './game-actions';

describe('GameActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GameActions
        showShips={false}
        onRestartGame={() => null}
        onToggleShowShips={() => null}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
