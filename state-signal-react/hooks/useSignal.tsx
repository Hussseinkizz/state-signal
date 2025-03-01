import { useSyncExternalStore } from "react";
import { effect, type Signal } from "../../index";

type Updater<T> = (prevValue: T) => T;

export function useSignal<T>(
  signal: Signal<T>,
): [T, (newValueOrUpdater: T | Updater<T>) => void] {
  function subscribe(callback: () => void): () => void {
    // Create an effect that runs the callback when signal.value changes
    effect(() => {
      // make sure signal is tracked
      const _ = signal.value;
      callback();
    });

    // Return the unsubscribe function to clean up the callback, un-applicable in our case
    return () => {};
  }

  function getSnapshot(): T {
    return signal.value;
  }

  const value = useSyncExternalStore(subscribe, getSnapshot);

  function setValue(newValueOrUpdater: T | Updater<T>): void {
    if (typeof newValueOrUpdater === "function") {
      signal.value = (newValueOrUpdater as Updater<T>)(signal.value);
    } else {
      signal.value = newValueOrUpdater;
    }
  }

  return [value, setValue];
}
