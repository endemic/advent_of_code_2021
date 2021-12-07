// Problem description: https://adventofcode.com/2021/day/2

fetch('https://adventofcode.com/2021/day/2/input').then(response => {
    return response.text();
}).then(body => {
    input = body.slice(0,-1).split("\n"); // remove last (empty) newline before splitting

    let position = { x: 0, y: 0 };

    input.forEach(command => {
        let [direction, amount] = command.split(' ');

        amount = parseInt(amount, 10);

        switch (direction) {
            case 'forward':
                position.x += amount;
                break;
            case 'up':
                position.y -= amount;
                break;
            case 'down':
                position.y += amount;
                break;
        }
    });

    console.log(`horizontal position (${position.x}) x final depth (${position.y}) = ${position.x * position.y}`);

    // part 2

    position = { x: 0, y: 0, aim: 0 };

    input.forEach(command => {
        let [direction, amount] = command.split(' ');

        amount = parseInt(amount, 10);

        switch (direction) {
            case 'forward':
                // It increases your horizontal position by X units.
                // It increases your depth by your aim multiplied by X.
                position.x += amount;
                position.y += position.aim * amount;
                break;
            case 'up':
                position.aim -= amount;
                break;
            case 'down':
                position.aim += amount;
                break;
        }
    });

    // What do you get if you multiply your final horizontal position by your final depth?
    console.log(`horizontal position (${position.x}) x final depth (${position.y}) = ${position.x * position.y}`);
});
