// Description of problem: https://adventofcode.com/2021/day/1

fetch('https://adventofcode.com/2021/day/1/input').then(response => {
    return response.text();
}).then(body => {
    input = body.slice(0,-1).split("\n").map(val => parseInt(val, 10)); // remove last (empty) newline before splitting

    let previousVal;
    let count = 0;

    input.forEach(val => {
        if (previousVal === undefined) {
            previousVal = val;
        }

        if (val > previousVal) {
            count += 1;
        }

        previousVal = val;
    });

    console.log(`${count} measurements are larger than the previous measurement`);

    // part 2

    let previousSum = 0;
    count = 0;

    for (let index = 0, j = input.length - 3; index < j; index += 1) {
        let sum = input[index] + input[index + 1] + input[index + 2];

        if (sum > previousSum) {
            count += 1;
        }

        previousSum = sum;
    }

    console.log(`${count} sums are larger than the previous sum`);
});
