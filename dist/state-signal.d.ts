/**
 * Creates a reactive signal.
 * @param initialValue - The initial value of the signal.
 * @returns An object with getter and setter for the signal's value.
 */
export declare function createSignal<T>(initialValue: T): {
    value: T;
};
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
