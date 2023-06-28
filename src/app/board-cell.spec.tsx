import { fireEvent, getByRole, render } from '@testing-library/react';

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

  it('should display no text if no shotted', () => {
    const { container } = render(
      <BoardCell
        shotted={false}
        hasShip={false}
        showShip={false}
        onCellClick={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display missed text if shotted and has no ship', () => {
    const { container } = render(
      <BoardCell
        shotted={true}
        hasShip={false}
        showShip={false}
        onCellClick={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display hitted text if shotted and has ship', () => {
    const { container } = render(
      <BoardCell
        shotted={true}
        hasShip={true}
        showShip={false}
        onCellClick={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display ship if has ship and show ship', () => {
    const { container } = render(
      <BoardCell
        shotted={false}
        hasShip={true}
        showShip={true}
        onCellClick={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onCellClick when clicking the cell', () => {
    const onCellClickSpy = vi.fn();
    const { container } = render(
      <BoardCell
        shotted={false}
        hasShip={true}
        showShip={true}
        onCellClick={onCellClickSpy}
      />
    );
    const button = getByRole(container, 'button');
    fireEvent.click(button);
    expect(onCellClickSpy).toHaveBeenCalledOnce();
  });
});
