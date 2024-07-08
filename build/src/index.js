"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iterate = void 0;
exports.range = range;
exports.naturals = naturals;
exports.map = map;
exports.take = take;
exports.filter = filter;
exports.drop = drop;
exports.reduce = reduce;
exports.sum = sum;
exports.product = product;
exports.count = count;
exports.nth = nth;
exports.enumerate = enumerate;
exports.occurrences = occurrences;
exports.zip = zip;
exports.toArray = toArray;
exports.fromArray = fromArray;
exports.iterate = iterate;
function* range(start, end = Infinity, step = 1) {
    let idx = start;
    while (idx < end) {
        yield idx;
        idx += step;
    }
}
function* naturals() {
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
function map(iterator, fn) {
    return new (class extends BaseIterator {
        next() {
            const next = iterator.next();
            if (next.done)
                return next;
            return {
                ...next,
                value: fn(next.value),
            };
        }
    })();
}
function take(iterator, n) {
    return new (class extends BaseIterator {
        constructor() {
            super(...arguments);
            this.idx = 0;
        }
        next() {
            if (this.idx >= n)
                return { done: true, value: null };
            this.idx++;
            return {
                ...iterator.next(),
                done: false,
            };
        }
    })();
}
function filter(iterator, fn) {
    return new (class extends BaseIterator {
        next() {
            let next = iterator.next();
            if (next.done)
                return next;
            // if (fn(next.value)) return next;
            // return this.next();
            while (!fn(next.value)) {
                next = iterator.next();
            }
            return next;
        }
    })();
}
function drop(iterator, n) {
    return new (class extends BaseIterator {
        constructor() {
            super(...arguments);
            this.toSkip = n;
        }
        next() {
            if (this.toSkip > 0) {
                this.toSkip--;
                iterator.next();
                return this.next();
            }
            return iterator.next();
        }
    })();
}
function reduce(iterator, fn, init) {
    let acc = init;
    let next = iterator.next();
    while (!next.done) {
        acc = fn(acc, next.value);
        next = iterator.next();
    }
    return acc;
}
function sum(iterator) {
    return reduce(iterator, (acc, item) => acc + item, 0);
}
function product(iterator) {
    return reduce(iterator, (acc, item) => acc * item, 1);
}
function count(iterator) {
    return reduce(iterator, acc => acc + 1, 0);
}
function nth(iterator, n) {
    let idx = 0;
    for (const item of iterator) {
        if (idx === n)
            return item;
        idx++;
    }
    throw new Error('Index out of bounds');
}
function enumerate(iterator) {
    return new (class extends BaseIterator {
        constructor() {
            super(...arguments);
            this.idx = 0;
        }
        next() {
            const next = iterator.next();
            if (next.done)
                return next;
            return {
                done: false,
                value: [this.idx++, next.value],
            };
        }
    })();
}
function occurrences(iterator) {
    return reduce(iterator, (acc, item) => {
        if (acc.has(item)) {
            acc.set(item, acc.get(item) + 1);
        }
        else {
            acc.set(item, 1);
        }
        return acc;
    }, new Map());
}
function zip(a, b) {
    return new (class extends BaseIterator {
        next() {
            const nextA = a.next();
            const nextB = b.next();
            if (nextA.done || nextB.done)
                return { done: true, value: null };
            return {
                done: false,
                value: [nextA.value, nextB.value],
            };
        }
    })();
}
function toArray(iterator) {
    return [...iterator];
}
function fromArray(array) {
    return new (class extends BaseIterator {
        constructor() {
            super(...arguments);
            this.idx = 0;
        }
        next() {
            if (this.idx === array.length)
                return { done: true, value: null };
            return {
                done: false,
                value: array[this.idx++],
            };
        }
    })();
}
class Iterate {
    constructor(iterator) {
        this.iterator = iterator;
    }
    map(fn) {
        return new Iterate(map(this.iterator, fn));
    }
    filter(fn) {
        return new Iterate(filter(this.iterator, fn));
    }
    take(n) {
        return new Iterate(take(this.iterator, n));
    }
    drop(n) {
        return new Iterate(drop(this.iterator, n));
    }
    reduce(fn, init) {
        return reduce(this.iterator, fn, init);
    }
    count() {
        return count(this.iterator);
    }
    nth(n) {
        return nth(this.iterator, n);
    }
    occurrences() {
        return occurrences(this.iterator);
    }
    zip(other) {
        return zip(this.iterator, other);
    }
}
exports.Iterate = Iterate;
function iterate(iterator) {
    return new Iterate(iterator);
}
//# sourceMappingURL=index.js.map