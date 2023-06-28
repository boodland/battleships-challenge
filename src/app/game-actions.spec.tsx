import { fireEvent, getByRole, getByText, render } from '@testing-library/react';

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

  it('should display checkbox unchecked if showShips is false', () => {
    const { container } = render(
      <GameActions
        showShips={false}
        onRestartGame={() => null}
        onToggleShowShips={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display checkbox checked if showShips is true', () => {
    const { container } = render(
      <GameActions
        showShips={true}
        onRestartGame={() => null}
        onToggleShowShips={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onRestartGame when clicking the button', () => {
    const onRestartGameSpy = vi.fn();
    const { container } = render(
      <GameActions
        showShips={false}
        onRestartGame={onRestartGameSpy}
        onToggleShowShips={() => null}
      />
    );
    const button = getByRole(container, 'button');
    fireEvent.click(button);
    expect(onRestartGameSpy).toHaveBeenCalledOnce();
  });

  it('should call onToggleShowShips when clicking the input checkbox', () => {
    const onToggleShowShipsSpy = vi.fn();
    const { container } = render(
      <GameActions
        showShips={false}
        onRestartGame={() => null}
        onToggleShowShips={onToggleShowShipsSpy}
      />
    );
    const checkbox = getByRole(container, 'checkbox');
    fireEvent.click(checkbox);
    expect(onToggleShowShipsSpy).toHaveBeenCalledOnce();
  });

  it('should call onToggleShowShips when clicking the checkbox text', () => {
    const onToggleShowShipsSpy = vi.fn();
    const { container } = render(
      <GameActions
        showShips={false}
        onRestartGame={() => null}
        onToggleShowShips={onToggleShowShipsSpy}
      />
    );
    const label = getByText(container, 'Show ships');
    fireEvent.click(label);
    expect(onToggleShowShipsSpy).toHaveBeenCalledOnce();
  });
});
