![TS Async Semaphore Banner](https://repository-images.githubusercontent.com/174854938/43fd2380-7682-11e9-92bf-8d162736f579)

<p align="center">
  <a href="https://circleci.com/gh/skrtheboss/ts-async-semaphore">
    <img alt="CircleCi Build Status" src="https://img.shields.io/circleci/build/github/skrtheboss/ts-async-semaphore/master?token=abc123def456&style=flat-square&logo=CircleCi">
  </a>
  <a href="https://codecov.io/gh/prettier/prettier">
    <img alt="Codecov Coverage Status" src="https://img.shields.io/coveralls/github/skrtheboss/ts-async-semaphore/master?style=flat-square&logo=Coveralls">
  </a>
  <a href="https://nodejs.org/">
    <img alt="NodeJs Support" src="https://img.shields.io/node/v/ts-async-semaphore?style=flat-square&logo=Node.js">
  </a>
  <a href="https://twitter.com/acdlite/status/974390255393505280">
    <img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/ts-async-semaphore">
    <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/ts-async-semaphore.svg?style=flat-square">
  </a>
  <a href="https://renovatebot.com/">
    <img alt="Renovate Bot" src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square">
  </a>
  <br/>
  <a href="https://www.npmjs.org/package/ts-async-semaphore">
    <img alt="npm version" src="http://img.shields.io/npm/v/ts-async-semaphore.svg?style=flat-square&logo=npm">
  </a>
  <a href="https://bundlephobia.com/result?p=ts-async-semaphore@1.0.1">
    <img alt="Minified size" src="https://img.shields.io/bundlephobia/min/ts-async-semaphore?style=flat-square">
  </a>
  <a href="https://bundlephobia.com/result?p=ts-async-semaphore@1.0.1">
    <img alt="Minified-Zipped size" src="https://img.shields.io/bundlephobia/minzip/ts-async-semaphore?style=flat-square">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="Semantic Release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-blue.svg?style=flat-square">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code%20style-prettier-blue?style=flat-square&logo=Prettier">
  </a>
  <a href="https://github.com/skrtheboss/ts-async-semaphore/blob/master/LICENSE">
    <img alt="Mit License" src="https://img.shields.io/npm/l/ts-async-semaphore?color=blue&style=flat-square">
  </a>
</p>

# Async Semaphore

A counting semaphore based on Java's Concurrent Semaphore.

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

