import {sum, filter, map, fromArray, iterate} from '../src';

const a1 = new Array(1_000_000).fill(Math.random);
const a2 = new Array(1_000_000).fill(Math.random);
const a3 = new Array(1_000_000).fill(Math.random);

const t0 = Date.now();
a1.map(x => x * 1000)
  .map(x => Math.floor(x))
  .filter(x => x % 2 === 0)
  .reduce((acc, item) => acc + item, 0);
const t1 = Date.now();

const t2 = Date.now();
sum(
  filter(
    map(
      map(fromArray(a2), x => x * 1000),
      x => Math.floor(x)
    ),
    x => x % 2 === 0
  )
);
const t3 = Date.now();

const t4 = Date.now();
iterate(fromArray(a3))
  .map(x => x * 1000)
  .map(x => Math.floor(x))
  .filter(x => x % 2 === 0)
  .reduce((acc, item) => acc + item, 0);
const t5 = Date.now();

console.log(`Array took ${t1 - t0}ms`);
console.log(`Iterator took ${t3 - t2}ms`);
console.log(`Iterator . notation took ${t5 - t4}ms`);
