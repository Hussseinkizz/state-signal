interface Signal<T> {
  value: T;
  subscribers: Set<Function>;
}

interface SignalOptions {
  history?: boolean;
  maxHistory?: number;
}

// Stack for managing active subscribers (effects)
const subscriberStack: Function[] = [];

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
export function createSignal<T>(initialValue: T, options: SignalOptions = {}) {
  const { history = true, maxHistory = 10 } = options;
  let value = initialValue;
  const subscribers = new Set<Function>();
  const historyArray: T[] = history ? [initialValue] : [];

  return {
    get value(): T {
      const currentSubscriber = subscriberStack[subscriberStack.length - 1];
      if (currentSubscriber) {
        subscribers.add(currentSubscriber);
      }
      return value;
    },
    set value(newValue: T) {
      if (value !== newValue) {
        value = newValue;
        if (history) {
          historyArray.push(newValue);
          if (historyArray.length > maxHistory) {
            historyArray.shift();
          }
        }
        for (const subscriber of subscribers) {
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
        `state signal error: Requested history index (${delta}) exceeds current size (${historyArray.length}). Consider using an index between -${historyArray.length} and -1.`,
      );
      return null;
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
    try {
      fn();
    } finally {
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
  reactiveFn();
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
