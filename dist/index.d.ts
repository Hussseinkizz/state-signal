type Signal<T> = {
    value: T;
    subscribers: Set<Function>;
    history(delta?: number): T | T[] | null;
    lock(): symbol | null;
    unlock(key: symbol | null): boolean;
};
type SignalOptions = {
    history?: boolean;
    maxHistory?: number;
};
/**
 * Creates a reactive signal.
 * @param initialValue - The initial value of the signal.
 * @param options{SignalOptions} - Extra configuration for this signal.
 * @returns An object with getter and setter for the signal's value.
 */
declare function createSignal<T>(initialValue: T, options?: SignalOptions): Signal<T>;
/**
 * Creates an effect that reacts to signals.
 * @param fn - The function to be executed as an effect.
 */
declare function effect(fn: Function): void;
/**
 * Creates a derived signal, computed based on other signals.
 * @param fn - A function that computes the derived value.
 * @returns A derived signal with getter and setter (setter logs an error).
 */
declare function derived<T>(fn: () => T): {
    value: T;
};

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
declare function useSignal<T>(signal: Signal<T>): [T, (newValueOrUpdater: T | Updater<T>) => void];

export { type Signal, type SignalOptions, createSignal, derived, effect, useSignal };
