export type Signal<T> = {
  value: T;
  subscribers: Set<Function>;
  history(delta?: number): T | T[] | null;
  lock(): symbol | null;
  unlock(key: symbol | null): boolean;
};

export type SignalOptions = {
  history?: boolean;
  maxHistory?: number;
};

// Stack for managing active subscribers (effects)
const subscriberStack: Function[] = [];
let activeEffect: Function | null = null;

// Dirty signals map for each running effect
const dirtySignals = new Map<Function, Set<Signal<unknown>>>();

// Batching mechanism
let batchedEffects = new Set<Function>();
let isBatching = false;

/**
 * Runs batched effects when batching is enabled.
 */
function runBatchedEffects(): void {
  for (const effect of batchedEffects) {
    effect();
  }
  batchedEffects.clear();
  isBatching = false;
}

/**
 * Creates a reactive signal.
 * @param initialValue - The initial value of the signal.
 * @param options{SignalOptions} - Extra configuration for this signal.
 * @returns An object with getter and setter for the signal's value.
 */
export function createSignal<T>(
  initialValue: T,
  options: SignalOptions = {},
): Signal<T> {
  const { history = true, maxHistory = 10 } = options;
  let value = initialValue;
  const subscribers = new Set<Function>();
  const historyArray: T[] = history ? [initialValue] : [];
  let lock_key: symbol | null = null;

  return {
    get value(): T {
      const currentSubscriber = subscriberStack[subscriberStack.length - 1];
      if (currentSubscriber) {
        subscribers.add(currentSubscriber);
      }
      const activeEffect = subscriberStack[subscriberStack.length - 1];
      const effectDirtySignals = dirtySignals.get(activeEffect);
      // Mark the signal as dirty for this subscriber
      effectDirtySignals?.add(this);
      return value;
    },
    set value(newValue: T) {
      if (lock_key) {
        console.error("Signal locked!");
        return;
      }
      if (value !== newValue) {
        value = newValue;
        if (history) {
          historyArray.push(newValue);
          if (historyArray.length > maxHistory) {
            historyArray.shift();
          }
        }

        for (const subscriber of subscribers) {
          // const activeEffect = subscriberStack[subscriberStack.length - 1];
          // const effectDirtySignals = dirtySignals.get(activeEffect);
          // Mark the signal as dirty for this subscriber
          // effectDirtySignals?.add(this);

          // console.log('log:activeEffect:', activeEffect);
          // console.log('log::dirtySignals', dirtySignals);
          // console.log('log::effectDirtySignals', effectDirtySignals);
          // if (effectDirtySignals?.has(this)) {
          // Skip notifying this subscriber since it's dirty for the active effect
          // console.log('already dirty...', newValue);
          //   continue;
          // }
          if (subscriber === activeEffect) {
            console.log("we are inside effect!", newValue);
            // subscriberStack.pop();
            activeEffect = null;
            continue;
          }

          if (isBatching) {
            batchedEffects.add(subscriber);
          } else {
            subscriber();
          }
        }

        if (!isBatching) {
          isBatching = true;
          Promise.resolve().then(runBatchedEffects);
        }
      }
    },
    /**
     * Gets the current signal's history upto N snapshots, where N is maxHistory or a historical value of the signal.
     * @param delta - If positive, returns the current value. If negative, returns the historical value `delta` steps back.
     * @returns The requested history or `null` if out of bounds or history is disabled.
     */
    history(delta: number = 0): T | T[] | null {
      if (!history) {
        console.warn(`History is deactivated for this signal.`);
        return null;
      }

      if (delta >= 0) return historyArray;

      const index = Math.abs(delta);
      if (index <= historyArray.length) {
        return historyArray.reverse()[index];
      }
      console.error(
        `State signal error: Requested history index (${delta}) exceeds current size (${historyArray.length}).`,
      );
      return null;
    },
    /**
     * Locks and makes the given signal immutable until it's unlocked, useful when passing it to external sources that you don't wish to modify it.
     * @returns lock_key: This should be used with signal's unlock method to make the signal mutable again.
     */
    lock() {
      if (lock_key) {
        console.error("Signal already has a lock!");
        return null;
      }
      const newId = Symbol();
      lock_key = newId;
      return lock_key;
    },
    /**
     * Unlocks and makes the given immutable signal mutable.
     * @param lock_key - The signal's unlock key returned from it's lock method.
     * @returns bool - True if unlocked or false otherwise.
     */
    unlock(key: symbol): boolean {
      if (!lock_key) {
        console.error("Signal has no lock!");
        return false;
      }
      if (key !== lock_key) {
        console.error("Unlock key does not match signal lock key!");
        return false;
      }
      lock_key = null;
      return true;
    },
    /**
     * Immutable set of subscribers.
     */
    get subscribers() {
      return Object.freeze(new Set(subscribers));
    },
  };
}

/**
 * Creates an effect that reacts to signals.
 * @param fn - The function to be executed as an effect.
 */
export function effect(fn: Function): void {
  interface ReactiveFunction extends Function {
    trackedSignals?: Signal<unknown>[];
  }

  const reactiveFn: ReactiveFunction = () => {
    cleanup();

    subscriberStack.push(reactiveFn);
    activeEffect = reactiveFn;
    dirtySignals.set(reactiveFn, new Set()); // Initialize dirty signals tracking

    try {
      fn();
    } finally {
      const activeDirtySignals = dirtySignals.get(reactiveFn);
      if (activeDirtySignals) {
        activeDirtySignals.clear(); // Clear dirty signals after the effect completes
      }
      subscriberStack.pop();
    }
  };

  const cleanup = () => {
    for (const signal of reactiveFn.trackedSignals || []) {
      signal.subscribers.delete(reactiveFn);
    }
    reactiveFn.trackedSignals = [];
  };

  reactiveFn.trackedSignals = [];
  reactiveFn(); // Initial execution of the effect
}

/**
 * Creates a derived signal, computed based on other signals.
 * @param fn - A function that computes the derived value.
 * @returns A derived signal with getter and setter (setter logs an error).
 */
export function derived<T>(fn: () => T) {
  const derivedSignal = createSignal<T>(null as T); // Explicitly specify type
  effect(() => {
    derivedSignal.value = fn();
  });

  return {
    get value(): T {
      return derivedSignal.value;
    },
    set value(_: T) {
      console.error(
        "Error: Derived signals are computed values and cannot be manually updated.",
      );
    },
  };
}
