export const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const BOARD_SIZE = columns.length * rows.length;

enum Direction {
    HORIZONTAL = 1,
    VERTICAL = 10,
};

type ShipType = "Battleship" | "Destroyer";

export type Ship = {
    type: ShipType,
    positions: number[],
};

type ShipInfo = {
    type: ShipType,
    isShunk: boolean,
}

function shouldMoveToLeft(startPosition: number, direction: Direction) {
    return ((startPosition % 10) > (columns.length / 2))
        && (direction === Direction.HORIZONTAL);
}

function shouldMoveToUp(startPosition: number, direction: Direction) {
    return ((startPosition > (BOARD_SIZE / 2))
        && (direction === Direction.VERTICAL));
}

function shouldMoveBackwards(startPosition: number, direction: Direction) {
    return shouldMoveToLeft(startPosition, direction) || shouldMoveToUp(startPosition, direction);
}

function generateShipPositions(type: ShipType, positionsTaken: number[]) {
    const numberOfPositions = type === "Battleship" ? 5 : 4;
    let positions = Array(numberOfPositions).fill(null);
    let generatePositions = true;
    while (generatePositions) {
        const startPosition = Math.floor(Math.random() * (BOARD_SIZE - 1));
        const direction = Math.random() > 0.5 ? Direction.HORIZONTAL : Direction.VERTICAL;
        const step = shouldMoveBackwards(startPosition, direction) ? -direction : direction;
        positions = positions.map((position, index) => startPosition + (step * index));
        generatePositions = positions.some((position) => positionsTaken.includes(position));
    }
    return positions;
}

function generateShip(type: ShipType, positionsTaken: number[]) {
    const positions = generateShipPositions(type, positionsTaken);
    const ship = { type, positions }

    return ship;
}

export function generateShips(): Ship[] {
    const battleship = generateShip('Battleship', []);
    const destroyer1 = generateShip('Destroyer', battleship.positions);
    const destroyer2 = generateShip('Destroyer', [...battleship.positions, ...destroyer1.positions]);
    return [
        battleship,
        destroyer1,
        destroyer2
    ]
}

export function initShots() {
    return Array(BOARD_SIZE).fill(false);
}

export function getShipsInfo(ships: Ship[], shots: boolean[]): ShipInfo[] {
    const shipsInfo = ships.map((ship) => {
        return { type: ship.type, isShunk: isShipShunk(ship, shots) }
    });
    return shipsInfo;
}

export function hasShip(ships: Ship[], position: number) {
    const hasShip = ships.some((ship) => ship.positions.includes(position));
    return hasShip;
}

export function isShipShunk(ship: Ship, shots: boolean[]) {
    const isShipShunk = ship.positions.every((position) => shots[position]);
    return isShipShunk;
}

export function hasGameFinished(ships: Ship[], shots: boolean[]) {
    const allShipsShunk = ships.every((ship) => isShipShunk(ship, shots));
    return allShipsShunk;
}

