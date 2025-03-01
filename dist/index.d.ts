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
/**
 * Creates a reactive signal.
 * @param initialValue - The initial value of the signal.
 * @param options{SignalOptions} - Extra configuration for this signal.
 * @returns An object with getter and setter for the signal's value.
 */
export declare function createSignal<T>(initialValue: T, options?: SignalOptions): Signal<T>;
/**
 * Creates an effect that reacts to signals.
 * @param fn - The function to be executed as an effect.
 */
export declare function effect(fn: Function): void;
/**
 * Creates a derived signal, computed based on other signals.
 * @param fn - A function that computes the derived value.
 * @returns A derived signal with getter and setter (setter logs an error).
 */
export declare function derived<T>(fn: () => T): {
    value: T;
};
