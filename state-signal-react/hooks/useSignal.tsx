"use client";
import { useSyncExternalStore } from "react";
import { effect, type Signal } from "../../index";

type Updater<T> = (prevValue: T) => T;

/**
 * Hook to use a signal in a React component.
 *
 * @param signal The signal to use.
 * @returns A tuple containing the current value of the signal and a function to update it.
 * @example
 * ```tsx
 * const countSignal = createSignal(0);
 * const [count, setCount] = useSignal(countSignal);
 * ```
 */
export function useSignal<T>(
  signal: Signal<T>,
): [T, (newValueOrUpdater: T | Updater<T>) => void] {
  function subscribe(callback: () => void): () => void {
    // Create an effect that runs the callback when signal.value changes
    effect(() => {
      // make sure signal is tracked
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _ = signal.value;
      callback();
    });

    // Return the unsubscribe function to clean up the callback, un-applicable in our case
    return () => {};
  }

  function getSnapshot(): T {
    return signal.value;
  }

  function getServerSnapshot(): T {
    return signal.value;
  }

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setValue(newValueOrUpdater: T | Updater<T>): void {
    if (typeof newValueOrUpdater === "function") {
      signal.value = (newValueOrUpdater as Updater<T>)(signal.value);
    } else {
      signal.value = newValueOrUpdater;
    }
  }

  return [value, setValue];
}
