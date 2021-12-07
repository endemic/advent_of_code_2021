// Problem description: https://adventofcode.com/2021/day/3

fetch('https://adventofcode.com/2021/day/3/input').then(response => {
    return response.text();
}).then(body => {
    let input = body.slice(0,-1).split("\n"); // remove last (empty) newline before splitting

    let count = {};

    input.forEach(number => {
        // split each string into its bit components, and use an object to
        // increment a count of the value of each position
        number.split('').forEach((value, bitIndex) => {
            value = parseInt(value, 10);  // make sure we're working with numbers rather than strings

            // do this dynamically here, so we don't have to know how long each string
            // of the input is. bitIndex starts at 0, which is the left-most bit
            if (count[bitIndex] === undefined) {
                count[bitIndex] = { 0: 0, 1: 0 };
            }

            count[bitIndex][value] += 1;
        });
    });

    // now we need to craft the gamma/epsilon numbers by checking, for each position,
    // whether 0 or 1 is the most common bit
    let gamma = '';
    let epsilon = '';

    for (const bitIndex in count) {
        const bitCount = count[bitIndex];

        // if 0 bit is more frequent
        if (bitCount[0] > bitCount[1]) {
            gamma += '0';
            epsilon += '1';
        } else if (bitCount[1] > bitCount[0]) {
            gamma += '1';
            epsilon += '0';
        } else {
            console.log('oops, looks like we might have equal bit frequency');
        }
    }

    let gammaDec = parseInt(gamma, 2);
    let epsilonDec = parseInt(epsilon, 2);

    console.log(`gamma (${gammaDec}) x epsilon (${epsilonDec}) = ${gammaDec * epsilonDec}`);

    // part 2

    let numberOvBits = input[0].length;

    // have to do this twice, once for the oxygen generator rating,
    // once for the CO2 scrubber raiting
    let oxygenSearchInput = [...input];  // shallow clone
    let co2SearchInput = [...input];    // shallow clone

    // enumerate through each bit position, starting with 0 (left-most bit)
    for (let bitPosition = 0; bitPosition < numberOvBits; bitPosition += 1) {
        oxygenCount = { 0: 0, 1: 0 };
        co2Count = { 0: 0, 1: 0 };

        // find the most common bit at the current position
        oxygenSearchInput.forEach(number => {
            let bitValue = parseInt(number[bitPosition], 10);
            oxygenCount[bitValue] += 1;
        });

        co2SearchInput.forEach(number => {
            let bitValue = parseInt(number[bitPosition], 10);
            co2Count[bitValue] += 1;
        });

        // filter oxygen
        if (oxygenSearchInput.length > 1)
            if (oxygenCount[0] > oxygenCount[1]) {
                // 0 is the most common value; oxygen keeps values with the bit in `bitPosition` === 0
                oxygenSearchInput = oxygenSearchInput.filter(number => {
                    return number[bitPosition] === '0'; // these binary numbers are strings in the input array
                });
            } else {
                // 1 is the most common value; oxygen keeps values with the bit in `bitPosition` === 1
                // values are equal; oxygen keeps values with the bit in `bitPosition` === 1
                oxygenSearchInput = oxygenSearchInput.filter(number => {
                    return number[bitPosition] === '1'; // these binary numbers are strings in the input array
                });
            }

        // filter co2
        if (co2SearchInput.length > 1)
            if (co2Count[0] > co2Count[1]) {
                // CO2 keeps values with the bit in `bitPosition` === 1
                co2SearchInput = co2SearchInput.filter(number => {
                    return number[bitPosition] === '1'; // these binary numbers are strings in the input array
                });
            } else {
                // CO2 keeps values with the bit in `bitPosition` === 0
                co2SearchInput = co2SearchInput.filter(number => {
                    return number[bitPosition] === '0'; // these binary numbers are strings in the input array
                });
            }

        if (oxygenSearchInput.length === 1 && co2SearchInput.length === 1) {
            // both input arrays have been narrowed down to a single result,
            // so we can break out of this loop
            break;
        }
    }

    let oxygenRating = parseInt(oxygenSearchInput[0], 2);
    let co2Rating = parseInt(co2SearchInput[0], 2);

    console.log(`oxygen rating = ${oxygenRating}, CO2 rating = ${co2Rating}; answer = ${oxygenRating * co2Rating}`)
});
