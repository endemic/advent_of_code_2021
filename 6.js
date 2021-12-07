// Problem description: https://adventofcode.com/2021/day/6

const countFish = (timer, daysLeft, cache) => {
    cache = cache || {};
    let subtotal = 1;

    for (let currentDay = 0; currentDay < daysLeft; currentDay += 1) {
        timer -= 1;

        if (timer < 0) {
            timer = 6;

            let remainder = daysLeft - currentDay - 1;  // "days" start from zero, so subtract 1

            // populate cache; given a fish with a "counter" of 8 and `remainder` days left,
            // how many more fish can they spawn?
            cache[remainder] = cache[remainder] || countFish(8, remainder, cache);

            subtotal += cache[remainder];
        }
    }

    return subtotal;
};

fetch('https://adventofcode.com/2021/day/6/input').then(response => {
    return response.text();
}).then(body => {
    const fish = body.split(',').map(n => parseInt(n, 10));

    let days = 80;
    let count = 0;
    let cache = {};

    fish.forEach(timer => {
        cache[timer] = cache[timer] || countFish(timer, days);
        count += cache[timer];
    });

    console.log(`${count} fish over ${days} days`);

    // part 2
    days = 256;
    count = 0;
    cache = {};

    fish.forEach(timer => {
        cache[timer] = cache[timer] || countFish(timer, days);
        count += cache[timer];
    });

    console.log(`${count} fish over ${days} days`);
});
