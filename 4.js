
const calculateAnswer = (board, lastCalledNumber) => {
    let sumOfUnmarkedNumbers = 0;
    board.forEach(place => {
        if (!place.marked) {
            sumOfUnmarkedNumbers += place.number;
        }
    });

    console.log(`${sumOfUnmarkedNumbers} x ${lastCalledNumber} = ${sumOfUnmarkedNumbers * lastCalledNumber}`);
};

const debugBoard = board => {
    for (let i = 0; i < 5; i += 1) {
        console.log(board.slice(i * 5, i * 5 + 5).map(p => p.marked ? 1 : 0).join( ));
    }
};

fetch('https://adventofcode.com/2021/day/4/input')
.then(response => {
    return response.text();
}).then(body => {
    let input = body;

    let [numbers, ...boards] = input.split('\n\n');

    // turn into array of Numbers
    numbers = numbers.split(',').map(n => parseInt(n, 10));

    // convert strings that represent boards into arrays of objects
    boards = boards.map(stringInput => {
        return stringInput.trim().replaceAll('\n', ' ').replaceAll('  ', ' ').split(' ').map(n => {
            return {
                marked: false,
                number: parseInt(n, 10)
            };
        });
    });

    let usedNumbers = [];
    let wonBoards = [];

    // NOTE!!!!: should continue playing the boards until they all win
    while (boards.length > wonBoards.length) {
        const number = numbers.shift();
        usedNumbers.push(number);

        // iterate over all active game boards, playing the chosen number and then checking for win conditions
        for (let boardIndex = 0; boardIndex < boards.length; boardIndex += 1) {

            // go to the next board if the current one already has a win condition
            if (wonBoards.indexOf(boardIndex) !== -1) {
                continue;
            }

            let board = boards[boardIndex];

            // mark spot on board if it has the same number as what is called this round
            board.forEach(place => {
                if (place.number === number) {
                    place.marked = true;
                }
            });

            // don't check for a win condition if there are fewer than 5 placed numbers;
            // need 5 in a row to win
            if (usedNumbers.length < 5) {
                continue;
            }

            let win;

            // check horizontal
            for (let y = 0; y < 5; y += 1) {
                win = true;

                for (let x = 0; x < 5; x += 1) {
                    let place = board[x + (y * 5)];

                    if (!place.marked) {
                        win = false;
                        break; // don't need to check the rest of the positions in this row
                    }
                }

                // was able to make it through a row successfully, meaning a win condition
                if (win) {
                    wonBoards.push(boardIndex);

                    if (wonBoards.length === 1) {
                        console.log('First winning board score:');
                        calculateAnswer(board, usedNumbers[usedNumbers.length - 1]);
                    }

                    break;
                }
            }

            // if we already have a horizontal win condition, no need to check this board further
            if (win) {
                continue;
            }

            // check vertical
            for (let x = 0; x < 5; x += 1) {
                win = true;

                for (let y = 0; y < 5; y += 1) {
                    let place = board[(y * 5) + x];

                    if (!place.marked) {
                        win = false;
                        break; // don't need to check the rest of the positions in this row
                    }
                }

                // was able to make it through a row successfully, meaning a win condition
                if (win) {
                    wonBoards.push(boardIndex);

                    if (wonBoards.length === 1) {
                        console.log('First winning board score:');
                        calculateAnswer(board, usedNumbers[usedNumbers.length - 1]);
                    }

                    break;
                }
            }
        }
    }

    console.log('Last winning board score:');
    calculateAnswer(boards[wonBoards[wonBoards.length - 1]], usedNumbers[usedNumbers.length - 1]);
});
