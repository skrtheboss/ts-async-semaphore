import { Semaphore } from './semaphore';

const awaitTime = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

jest.setTimeout(20);

describe('Semaphore', () => {
    test('new Semaphore should create non-fair semaphore', () => {
        const semaphore = new Semaphore();
        expect(semaphore.isFair()).toBeFalsy();
    });

    test('expect acquire() to get 1 permit', async () => {
        const semaphore = new Semaphore(1);

        expect(semaphore.availablePermits()).toEqual(1);

        await semaphore.acquire();

        expect(semaphore.availablePermits()).toEqual(0);
    });

    test('expect acquire() should wait till permits are available', async () => {
        const semaphore = new Semaphore(0);
        const test = jest.fn();

        expect(await semaphore.tryAcquire()).toBeFalsy();

        const promise = semaphore.acquire();

        expect(semaphore.hasQueuedAcquirers()).toBeTruthy();

        await awaitTime(10);
        test();
        semaphore.release(1);

        await promise;

        expect(test).toBeCalled();
    });

    test('expect reducePermit() to reduce permits', async () => {
        const semaphore = new Semaphore(1);

        expect(await semaphore.tryAcquire()).toBeTruthy();

        semaphore.reducePermits(1);

        expect(await semaphore.tryAcquire()).toBeFalsy();
    });

    test('expect drainPermits() to reduce permits to 0', async () => {
        const semaphore = new Semaphore(5);

        expect(await semaphore.tryAcquire(5)).toBeTruthy();

        semaphore.drainPermits();

        expect(semaphore.availablePermits()).toEqual(0);
    });

    test('expect _checkSemaphore() to be called only after action triggered', async () => {
        const semaphore = new Semaphore(0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const checkSemaphore = jest.spyOn(semaphore as any, '_checkSemaphore');

        await awaitTime(10);

        expect(checkSemaphore).toHaveBeenCalledTimes(0);

        semaphore.release();

        expect(checkSemaphore).toHaveBeenCalledTimes(1);
    });

    test('expect getQueueLength() to return correct values', async () => {
        const semaphore = new Semaphore(0);

        semaphore.acquire(2);
        semaphore.acquire();

        expect(semaphore.getQueueLength()).toEqual(2);

        semaphore.release();

        expect(semaphore.getQueueLength()).toEqual(1);
    });

    test('expect getQueueLength() in fair mode to return correct values', async () => {
        const semaphore = new Semaphore(0, true);

        semaphore.acquire(2);
        semaphore.acquire();

        expect(semaphore.getQueueLength()).toEqual(2);

        semaphore.release(1);

        expect(semaphore.getQueueLength()).toEqual(2);

        semaphore.release();

        expect(semaphore.getQueueLength()).toEqual(1);
    });

    test('expect getQueueAcquirers() in fair mode to return correct values', async () => {
        const semaphore = new Semaphore(0, true);

        semaphore.acquire(2);
        semaphore.acquire();

        expect(semaphore.getQueuedAcquirers()).toHaveLength(2);

        semaphore.release();

        expect(semaphore.getQueuedAcquirers()).toHaveLength(2);

        semaphore.release();

        expect(semaphore.getQueuedAcquirers()).toHaveLength(1);
    });

    test('expect tryAcquire() with timeout to return true', async () => {
        const semaphore = new Semaphore(0, true);

        await Promise.all([
            expect(semaphore.tryAcquire(2, 10)).resolves.toBeTruthy(),
            awaitTime(5).then(() => semaphore.release(2)),
        ]);
    });

    test('expect tryAcquire() with timeout to return false after timed out', async () => {
        const semaphore = new Semaphore(0, true);

        expect(await semaphore.tryAcquire(2, 10)).toBeFalsy();
    });

    test('expect tryAcquire() not to fail if acquirer is deleted from the array and timeout is called', async () => {
        const semaphore = new Semaphore(0, true);

        await Promise.all([
            expect(semaphore.tryAcquire(2, 10)).resolves.toBeFalsy(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (semaphore as any).acquirers.splice(0, 1),
        ]);
    });

    test('expect calls with wrong parameter to fail if is not a valid value', async () => {
        const semaphore = new Semaphore();

        expect(() => semaphore.reducePermits(-1)).toThrowError();
        expect(() => semaphore.release(-1)).toThrowError();
        await expect(semaphore.tryAcquire(-1)).rejects.toThrowError();
        await expect(semaphore.acquire(-1)).rejects.toThrowError();
    });
});
