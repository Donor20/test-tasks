const ROWS = 10;
const COLS = 10;
const MIN = -100;
const MAX = 100;

const getRandomInt = (min, max) => (
    Math.floor(Math.random() * (max - min + 1)) + min
);

const generateRandomMatrix = (rows, cols, min, max) => {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(getRandomInt(min, max));
        }
        matrix.push(row);
    }

    return matrix;
};

const findMinValue = (matrix) => {
    let min = Infinity;

    for (const row of matrix) {
        for (const val of row) {
            if (val < min) {
                min = val;
            }
        }
    }

    return min;
};

const findMinPositive = (row) => {
    const positives = row.filter(n => n > 0);
    return positives.length > 0 ? Math.min(...positives) : null;
};

const countReplacementsToBreakTriplets = (row) => {
    let replacements = 0;
    let i = 0;

    while (i < row.length - 2) {
        const trio = row.slice(i, i + 3);
        if (trio.every(n => n > 0) || trio.every(n => n < 0)) {
            replacements++;
            i += 3;
        } else {
            i++;
        }
    }

    return replacements;
};

const printMatrixWithInfo = (matrix) => {
    const minValue = findMinValue(matrix);

    for (const row of matrix) {
        const rowStr = row.map(n => n.toString().padStart(5)).join(' ');
        const marker = row.includes(minValue) ? '*' : ' ';
        const minPositive = findMinPositive(row);
        const minPositiveStr = (minPositive !== null ? minPositive.toString() : '-').padStart(4);
        const replacements = countReplacementsToBreakTriplets(row);

        console.log(
            `${marker} ${rowStr}  | Min +: ${minPositiveStr} | Replacements: ${replacements}`
        );
    }
};

const main = () => {
    const matrix = generateRandomMatrix(ROWS, COLS, MIN, MAX);
    printMatrixWithInfo(matrix);
};

main();
