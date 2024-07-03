export declare function range(start: number, end?: number, step?: number): Generator<number, void, unknown>;
export declare function naturals(): Generator<number, void, unknown>;
export declare function map<T, U>(iterator: IterableIterator<T>, fn: (item: T) => U): IterableIterator<U>;
export declare function take<T>(iterator: IterableIterator<T>, n: number): IterableIterator<T>;
export declare function filter<T>(iterator: IterableIterator<T>, fn: (item: T) => boolean): IterableIterator<T>;
export declare function drop<T>(iterator: IterableIterator<T>, n: number): IterableIterator<T>;
export declare function reduce<T, U>(iterator: IterableIterator<T>, fn: (acc: U, item: T) => U, init: U): U;
export declare function sum(iterator: IterableIterator<number>): number;
export declare function product(iterator: IterableIterator<number>): number;
export declare function count<T>(iterator: IterableIterator<T>): number;
export declare function nth<T>(iterator: IterableIterator<T>, n: number): T;
export declare function enumerate<T>(iterator: IterableIterator<T>): IterableIterator<[number, T]>;
export declare function toArray<T>(iterator: IterableIterator<T>): Array<T>;
export declare function fromArray<T>(array: Array<T>): IterableIterator<T>;
export declare class Iterate<T> {
    private iterator;
    constructor(iterator: IterableIterator<T>);
    map<U>(fn: (item: T) => U): Iterate<U>;
    filter(fn: (item: T) => boolean): Iterate<T>;
    take(n: number): Iterate<T>;
    drop(n: number): Iterate<T>;
    reduce<U>(fn: (acc: U, item: T) => U, init: U): U;
    count(): number;
    nth(n: number): T;
}
export declare function iterate<T>(iterator: IterableIterator<T>): Iterate<T>;
