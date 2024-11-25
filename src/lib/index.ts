// Signal interface to represent a reactive signal
interface Signal<T> {
  value: T;
  subscribers: Set<Function>;
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
 * @returns An object with getter and setter for the signal's value.
 */
export function createSignal<T>(initialValue: T) {
  let value = initialValue;
  const subscribers = new Set<Function>();

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
  };
}

/**
 * Creates an effect that reacts to signals.
 * @param fn - The function to be executed as an effect.
 */
export function effect(fn: Function): void {
  // Define an interface for the reactive function
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
  reactiveFn(); // Initial execution
}

/**
 * Creates a derived signal, computed based on other signals.
 * @param fn - A function that computes the derived value.
 * @returns A derived signal with getter and setter (setter logs an error).
 */
export function derived<T>(fn: () => T) {
  const derivedSignal = createSignal<T>(null as T); // Explicitly specify type
  effect(() => {
    derivedSignal.value = fn(); // Recalculate based on dependencies
  });

  return {
    get value(): T {
      return derivedSignal.value; // Getter for the computed value
    },
    set value(_: T) {
      console.error(
        "Error: Derived signals are computed values and cannot be manually updated.",
      );
    },
  };
}
