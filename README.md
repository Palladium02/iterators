# Iterate

Itertools is a small library that builds upon the iterator protocol to optimize
certain operations on big collections of values.

## Usage

```sh
npm install https://github.com/Palladium02/itertools.git
```

```ts
import {fromArray} from 'iterate';

const iterator = fromArray([1, 2, 3]);
```

## Functions

- `fromArray :: Array a -> IterableIterator a` - Creates an IterableIterator based on an array.
- `toArray :: IterableIterator a -> Array a` - Collects an IterableIterator into an array.
- `range :: number -> Maybe number -> Maybe number` - Creates an iterable iterator that represents a range. A start is required, might be infinite, the default step size is 1.
- `naturals` - Creates an IterableIterator that represents the set of all natural numbers.
- `map :: IterableIterator a -> (a -> u) -> IterableIterator u` - Transforms an IterableIterator into another based on a given function.
- `take :: IterableIterator a -> number -> IterableIterator a` - Takes the first n elements from an IterableIterator and puts them into a new one.
- `filter :: IterableIterator a -> (a -> boolean) -> IterableIterator a` - Filters out all non fitting elements from an IterableIterator based on the given predicate.
- `drop :: IterableIterator a -> number -> IterableIterator a` - Removes the first n elements from an IterableIterator.
- `reduce :: IterableIterator a -> (u -> a -> u) -> u` - Reduces an IterableIterator based on the given function.
- `sum :: IterableIterator number -> number` - Sums up all elements in an IterableIterator of numbers.
- `product :: IterableIterator number -> number` - Multiplies all elements in an IterableIterator of numbers.
- `count :: IterableIterator a -> number` - Returns the size of a given IterableIterator.
- `nth :: IterableIterator a -> number -> Maybe a` - Returns the nth element of an IterableIterator if present.
- `enumerate :: IterableIterator a -> IterableIterator (number, a)` - Returns a new iterable iterator which groups the elements with their index in the original IterableIterator.
- `iterate :: Iterate` - Returns an instance of the Iterate class.

## Methods

The `iterate` function returns an instance of the `Iterate` class which exposes
the same function as listed above just as methods - that way you can pick your poison (functional or OO)

## Performance

Up to a certain amount of elements the array versions of the iterate versions are pretty much on par.
At around 100_000 elements the iterate versions are 4ms faster - at 1_000_000 elements the gap increase to 100ms already.
