import { render } from '@testing-library/react';

import GameInfo from './game-info';

describe('GameInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameInfo ships={[]} shots={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
