import { hasShip } from './utils';

describe('utils', () => {
  it('hasShip should work', () => {
    expect(hasShip([], 0)).toEqual(false);
  });
});