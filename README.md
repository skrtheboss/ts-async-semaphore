[![Build Status][build-status-image]][build-status-url]
[![Coverage Status][coverage-image]][coverage-url]
[![MIT License][license-image]][license-url]

# Async Semaphore

A counting semaphore based on Java's Concurrent Semaphore.


[![https://nodei.co/npm/harperdb-connect.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/harperdb-connect.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/harperdb-connect)

## Install

Install the module via npm:

    npm install ts-async-semaphore

## Quick Example

```typescript
// fairness false

import {Semaphore} from 'ts-async-semaphore';
const semaphore = new Semaphore(0);

semaphore.acquire(2).then(() => {
  console.log('Hello');
});

semaphore.acquire().then(() => {
  console.log('World');

  semaphore.release(2);
});

setTimeout(function() {
  semaphore.release();
}, 2000);

```

```typescript
// fairness true

import {Semaphore} from 'ts-async-semaphore';
const semaphore = new Semaphore(0, true);

semaphore.acquire(2).then(() => {
  console.log('Hello');
});

semaphore.acquire().then(() => {
    console.log('World');
})

semaphore.release(1);

setTimeout(function() {
  semaphore.release(2);
}, 2000);

```

```typescript
import {Semaphore} from 'ts-async-semaphore';
const semaphore = new Semaphore(0, true);

semaphore.tryAcquire(1 , 50).then(val => {
    console.log(`Acquire ${val ? 'success' : 'fail'}`);
})

```

## Documentation

#### Constructor: Semaphore([`permits`], [`fairness`])

`permits: Integer` Initial available permits of semaphore. `Default: 0`.

`fairness: Boolean` Fairness of semaphore. If set to `true`, a FIFO rules applied, else, look on each acquirers permit value.

---

#### #availablePermits()

Returns the current number of permits available in this semaphore.

Returns: `number`

---

#### #acquire([`permits`])

Acquires the given number of permits from this semaphore.

`permits: number` The number of permits to acquire. `Default: 0`.

Returns: `Promise<void>`
---

#### #getQueuedAcquirers()

Returns an estimate of the number of acquirers waiting to acquire.

Returns: `Function[]`

---

#### #getQueueLength()

Returns an estimate of the number of acquirers waiting to acquire.

Returns: `number`

---

#### #release([`permits`])

Releases the given number of permits, returning them to the semaphore.

`permits: number` The number of permits to release. `Default: 0`.

---

#### #drainPermits()

Acquires and returns all permits that are immediately available.

Returns: `number`

---

#### #reducePermits(`permits`)

Shrinks the number of available permits by the indicated reduction.

`permits: number` The number of permits to remove.

---

#### #tryAcquire([`permits`], [`timeoutMs`])

Acquires the given number of permits from this semaphore.

`permits: number` The number of permits to acquire. `Default: 0`.
`timeoutMs: number` The timeout after which the acquire will fail

Returns: `Boolean` Promise `true` if success, `false` false if fail

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[build-status-image]: https://circleci.com/gh/skrtheboss/ts-async-semaphore.svg?style=svg
[build-status-url]: https://circleci.com/gh/skrtheboss/ts-async-semaphore
[coverage-image]: https://coveralls.io/repos/github/Ethan-Arrowood/ts-async-semaphore/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/Ethan-Arrowood/ts-async-semaphore?branch=master
[npm-url]: https://npmjs.org/package/ts-async-semaphore
[npm-version-image]: http://img.shields.io/npm/v/ts-async-semaphore.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/ts-async-semaphore.svg?style=flat
