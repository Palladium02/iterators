import {naturals, iterate, zip, Collectors} from '../src';

iterate(naturals())
    .filter(n => n % 3 === 0)
    .take(1000)
    .collect(Collectors.array);

iterate(iterate(naturals())
    .filter(n => n % 2 === 0)
    .take(1000)
    .zip(
        iterate(naturals())
            .filter(n => n % 2 === 1)
            .take(1000)
            .raw()
    )).collect(Collectors.map);

iterate(naturals()).peekable().peek();