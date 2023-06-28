import {
    Ship,
    columns,
    generateShips,
    getShipsInfo,
    hasGameFinished,
    hasShip,
    initShots,
    rows,
} from './utils';

const ships: Ship[] = [
    { type: "Battleship", positions: [0, 1, 2, 3, 4] },
    { type: "Destroyer", positions: [5, 6, 7, 8] }
]

const initialShots = Array(10).fill(false);
const allPositionsShotted = Array(10).fill(true);

describe('utils', () => {
    describe('columns should have', () => {
        it('correct values', () => {
            expect(columns).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
        });
    });

    describe('rows should have', () => {
        it('correct values', () => {
            expect(rows).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
    });

    describe('hasShip should returns', () => {
        it('false when there are no ships', () => {
            expect(hasShip([], 0)).toEqual(false);
        });
        it('false when there are no ships in that position', () => {
            expect(hasShip(ships, 30)).toEqual(false);
        });
        it('true when there are ships in that position', () => {
            expect(hasShip(ships, 0)).toEqual(true);
        });
    });

    describe('hasGameFinished should returns', () => {
        it('true when there are no ships', () => {
            expect(hasGameFinished([], initialShots)).toEqual(true);
        });
        it('false when not all ships positions have shots', () => {
            let shots = [...initialShots];
            shots[0] = true;
            shots[1] = true;
            expect(hasGameFinished(ships, [true, false, false])).toEqual(false);

            shots = [...allPositionsShotted];
            shots[0] = false;
            expect(hasGameFinished(ships, [true, false, false])).toEqual(false);

            shots = [...allPositionsShotted];
            shots[8] = false;
            expect(hasGameFinished(ships, [true, false, false])).toEqual(false);
        });
        it('true when all ships positions have shots', () => {
            expect(hasGameFinished(ships, allPositionsShotted)).toEqual(true);
        });
    });

    describe('getShipsInfo should returns', () => {
        it('empty array if no ships are passed', () => {
            expect(getShipsInfo([], [])).toEqual([]);
        });
        it('the same number of ships that have been passed', () => {
            const shipsInfo = getShipsInfo(ships, initialShots);
            expect(shipsInfo).length(ships.length);
        });
        it('the same ships types that are passed', () => {
            const shipsInfo = getShipsInfo(ships, initialShots);
            expect(shipsInfo[0].type).toEqual(ships[0].type);
            expect(shipsInfo[1].type).toEqual(ships[1].type);
        });
        it('the isShunk to false if the ship is not shunk', () => {
            const shipsInfo = getShipsInfo(ships, initialShots);
            expect(shipsInfo[0].isShunk).toEqual(false);
            expect(shipsInfo[1].isShunk).toEqual(false);
        });
        it('the isShunk to true if the ship is shunk', () => {
            const shipsInfo = getShipsInfo(ships, allPositionsShotted);
            expect(shipsInfo[0].isShunk).toEqual(true);
            expect(shipsInfo[1].isShunk).toEqual(true);
        });
    });

    describe('initShots should returns an array', () => {
        it('', () => {
            expect(initShots()).toBeInstanceOf(Array);
        });
        it('with size rows x columns', () => {
            expect(initShots()).toHaveLength(rows.length * columns.length);
        });

        it('with all values set to false', () => {
            const initialShots = initShots();
            expect(initialShots.every((shot) => !shot)).toEqual(true);
        });
    });

    describe('generateShips should returns 3 ships', () => {
        it('with 1 Battleship and 2 Destroyers', () => {
            const ships = generateShips();
            const battleships = ships.filter((ship) => ship.type === 'Battleship');
            const destroyers = ships.filter((ship) => ship.type === 'Destroyer');
            expect(ships).toHaveLength(3);
            expect(battleships).toHaveLength(1);
            expect(destroyers).toHaveLength(2);
        });

        it('with different positions', () => {
            const ships = generateShips();
            const allPositions = [
                ...ships[0].positions,
                ...ships[1].positions,
                ...ships[2].positions,
            ];
            const uniquePositions = new Set(allPositions);
            expect(allPositions.length).toEqual(uniquePositions.size);
        });

        it('with positions within [0, rows x columns)', () => {
            const ships = generateShips();
            const allPositions = [
                ...ships[0].positions,
                ...ships[1].positions,
                ...ships[2].positions,
            ];
            const maxPosition = (rows.length * columns.length) - 1;
            const areAllWithinLimits = allPositions.every((position) => (position >= 0 && position < maxPosition));
            expect(areAllWithinLimits).toEqual(true);
        });

        it('with positions following a direction', () => {
            const ships = generateShips();

            const hasCorrectDirection = (positions: number[]): boolean => {
                const right = positions.map((position, index) => positions[0] + (index * 1));
                const left = positions.map((position, index) => positions[0] + (index * -1));
                const top = positions.map((position, index) => positions[0] + (index * -10));
                const down = positions.map((position, index) => positions[0] + (index * 10));
                return [right, left, top, down].some(
                    (direction) => direction.every((position, index) => position === positions[index])
                );
            };

            const followsADirection = ships.reduce((previousValue, ship) => {
                return previousValue && hasCorrectDirection(ship.positions);
            }, true);
            expect(followsADirection).toEqual(true);
        });
    });
});