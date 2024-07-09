export function* range(start: number, end = Infinity, step = 1) {
  let idx = start;
  while (idx < end) {
    yield idx;
    idx += step;
  }
}

export function* naturals() {
  let i = 0;
  while (true) {
    yield i;
    i++;
  }
}

class BaseIterator {
  [Symbol.iterator]() {
    return this;
  }
}

export function map<T, U>(
  iterator: IterableIterator<T>,
  fn: (item: T) => U
): IterableIterator<U> {
  return new (class extends BaseIterator {
    public next() {
      const next = iterator.next();
      if (next.done) return next;
      return {
        ...next,
        value: fn(next.value),
      };
    }
  })();
}

export function take<T>(
  iterator: IterableIterator<T>,
  n: number
): IterableIterator<T> {
  return new (class extends BaseIterator {
    private idx = 0;

    public next() {
      if (this.idx >= n) return {done: true, value: null};
      this.idx++;
      return {
        ...iterator.next(),
        done: false,
      };
    }
  })();
}

export function filter<T>(
  iterator: IterableIterator<T>,
  fn: (item: T) => boolean
): IterableIterator<T> {
  return new (class extends BaseIterator {
    public next(): IteratorResult<T> {
      let next = iterator.next();
      if (next.done) return next;
      // if (fn(next.value)) return next;
      // return this.next();
      while (!fn(next.value)) {
        next = iterator.next();
      }
      return next;
    }
  })();
}

export function drop<T>(
  iterator: IterableIterator<T>,
  n: number
): IterableIterator<T> {
  return new (class extends BaseIterator {
    private toSkip = n;

    public next(): IteratorResult<T> {
      if (this.toSkip > 0) {
        this.toSkip--;
        iterator.next();
        return this.next();
      }
      return iterator.next();
    }
  })();
}

export function reduce<T, U>(
  iterator: IterableIterator<T>,
  fn: (acc: U, item: T) => U,
  init: U
): U {
  let acc = init;
  let next = iterator.next();
  while (!next.done) {
    acc = fn(acc, next.value);
    next = iterator.next();
  }
  return acc;
}

export function sum(iterator: IterableIterator<number>): number {
  return reduce(iterator, (acc, item) => acc + item, 0);
}

export function product(iterator: IterableIterator<number>): number {
  return reduce(iterator, (acc, item) => acc * item, 1);
}

export function count<T>(iterator: IterableIterator<T>): number {
  return reduce(iterator, acc => acc + 1, 0);
}

export function nth<T>(iterator: IterableIterator<T>, n: number): T {
  let idx = 0;
  for (const item of iterator) {
    if (idx === n) return item;
    idx++;
  }
  throw new Error('Index out of bounds');
}

export function enumerate<T>(
  iterator: IterableIterator<T>
): IterableIterator<[number, T]> {
  return new (class extends BaseIterator {
    private idx = 0;

    public next(): IteratorResult<[number, T]> {
      const next = iterator.next();
      if (next.done) return next;
      return {
        done: false,
        value: [this.idx++, next.value],
      };
    }
  })();
}

export function occurrences<T>(iterator: IterableIterator<T>): Map<T, number> {
  return reduce(
    iterator,
    (acc, item) => {
      if (acc.has(item)) {
        acc.set(item, acc.get(item) + 1);
      } else {
        acc.set(item, 1);
      }
      return acc;
    },
    new Map()
  );
}

export function zip<T, U>(
  a: IterableIterator<T>,
  b: IterableIterator<U>
): IterableIterator<[T, U]> {
  return new (class extends BaseIterator {
    public next(): IteratorResult<[T, U]> {
      const nextA = a.next();
      const nextB = b.next();
      if (nextA.done || nextB.done) return {done: true, value: null};
      return {
        done: false,
        value: [nextA.value, nextB.value],
      };
    }
  })();
}

export function toArray<T>(iterator: IterableIterator<T>): Array<T> {
  return [...iterator];
}

export function fromArray<T>(array: Array<T>): IterableIterator<T> {
  return new (class extends BaseIterator {
    private idx = 0;
    public next(): IteratorResult<T> {
      if (this.idx === array.length) return {done: true, value: null};
      return {
        done: false,
        value: array[this.idx++],
      };
    }
  })();
}

export function toMap<T, U>(iterator: IterableIterator<[T, U]>): Map<T, U> {
  return reduce(iterator, (acc, item) => {
    acc.set(item[0], item[1]);
    return acc;
  }, new Map());
}

export function collect<T, U>(
  iterator: IterableIterator<T>,
  collector: (iterator: IterableIterator<T>) => U
): U {
  return collector(iterator);
}

export class Iterate<T> {
  public constructor(private iterator: IterableIterator<T>) {}

  public map<U>(fn: (item: T) => U): Iterate<U> {
    return new Iterate(map(this.iterator, fn));
  }

  public filter(fn: (item: T) => boolean): Iterate<T> {
    return new Iterate(filter(this.iterator, fn));
  }

  public take(n: number): Iterate<T> {
    return new Iterate(take(this.iterator, n));
  }

  public drop(n: number): Iterate<T> {
    return new Iterate(drop(this.iterator, n));
  }

  public reduce<U>(fn: (acc: U, item: T) => U, init: U): U {
    return reduce(this.iterator, fn, init);
  }

  public count(): number {
    return count(this.iterator);
  }

  public nth(n: number): T {
    return nth(this.iterator, n);
  }

  public occurrences() {
    return occurrences(this.iterator);
  }

  public zip<U>(other: IterableIterator<U>) {
    return zip(this.iterator, other);
  }

  public collect<U>(collector: (iterator: IterableIterator<T>) => U): U {
    return collect(this.iterator, collector);
  }

  public raw() {
    return this.iterator;
  }

  public peekable() {
    const self = this;
    let peeked = this.iterator.next();
    return new (class extends BaseIterator {
      public next() {
        let old = peeked;
        peeked = self.iterator.next();
        return old;
      }

      public peek(): T | undefined {
        if (peeked.done) return undefined;
        return peeked.value;
      }
    })()
  }
}

export function iterate<T>(iterator: IterableIterator<T>) {
  return new Iterate(iterator);
}

export const Collectors = {
  array: <T>(iterator: IterableIterator<T>) => toArray(iterator),
  map: <T, U>(iterator: IterableIterator<[T, U]>) => toMap(iterator),
}
