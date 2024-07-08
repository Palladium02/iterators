import {describe, it} from 'node:test';
import assert from 'node:assert';
import {
  count,
  drop,
  enumerate,
  filter,
  map,
  naturals,
  nth,
  product,
  range,
  reduce,
  sum,
  occurrences,
  take,
  toArray,
} from '../src/index';

describe('range', () => {
  it('should generate a range of numbers', () => {
    const result = toArray(range(0, 5));
    assert.deepEqual(result, [0, 1, 2, 3, 4]);
  });
});

describe('naturals', () => {
  it('should generate the first 10 natural numbers', () => {
    const result = toArray(range(0, 10));
    assert.deepEqual(result, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe('map', () => {
  it('should apply a function to each element', () => {
    const result = toArray(map(range(0, 5), x => x * x));
    assert.deepEqual(result, [0, 1, 4, 9, 16]);
  });
});

describe('take', () => {
  it('should take the first n elements', () => {
    const result = toArray(take(naturals(), 5));
    assert.deepEqual(result, [0, 1, 2, 3, 4]);
  });
});

describe('filter', () => {
  it('should filter elements based on a predicate', () => {
    const result = toArray(filter(take(naturals(), 10), x => x % 2 === 0));
    assert.deepEqual(result, [0, 2, 4, 6, 8]);
  });
});

describe('drop', () => {
  it('should drop the first n elements', () => {
    const result = toArray(drop(take(naturals(), 10), 5));
    assert.deepEqual(result, [5, 6, 7, 8, 9]);
  });
});

describe('reduce', () => {
  it('should reduce the elements to a single value', () => {
    const result = reduce(take(naturals(), 101), (acc, item) => acc + item, 0);
    assert.deepEqual(result, 5050);
  });
});

describe('sum', () => {
  it('should sum the elements', () => {
    const result = sum(take(naturals(), 101));
    assert.deepEqual(result, 5050);
  });
});

describe('product', () => {
  it('should multiply the elements', () => {
    const result = product(range(1, 7));
    assert.deepEqual(result, 720);
  });
});

describe('count', () => {
  it('should count the elements', () => {
    const result = count(take(naturals(), 100));
    assert.deepEqual(result, 100);
  });
});

describe('nth', () => {
  it('should get the nth element', () => {
    const result = nth(take(naturals(), 100), 99);
    assert.deepEqual(result, 99);
  });
});

describe('enumerate', () => {
  it('should enumerate the elements', () => {
    const result = toArray(enumerate(take(naturals(), 5)));
    assert.deepEqual(result, [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ]);
  });
});

describe('occurrences', () => {
  it('should count the occurrences of the element and collect them in a Map', () => {
    const result = occurrences(take(naturals(), 5));
    assert.deepEqual(
      result,
      new Map([
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
      ])
    );
  });
});
