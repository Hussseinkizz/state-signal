interface SignalOptions {
    history?: boolean;
    maxHistory?: number;
}
/**
 * Creates a reactive signal.
 * @param initialValue - The initial value of the signal.
 * @param options{SignalOptions} - Extra configuration for this signal.
 * @returns An object with getter and setter for the signal's value.
 */
export declare function createSignal<T>(initialValue: T, options?: SignalOptions): {
    value: T;
    /**
     * Gets the current signal's history upto N snapshots, where N is maxHistory or a historical value of the signal.
     * @param delta - If positive, returns the current value. If negative, returns the historical value `delta` steps back.
     * @returns The requested history or `null` if out of bounds or history is disabled.
     */
    history(delta?: number): T | T[] | null;
    /**
     * Locks and makes the given signal immutable until it's unlocked, useful when passing it to external sources that you don't wish to modify it.
     * @returns lock_key: This should be used with signal's unlock method to make the signal mutable again.
     */
    lock(): any;
    /**
     * Unlocks and makes the given immutable signal mutable.
     * @param lock_key - The signal's unlock key returned from it's lock method.
     * @returns bool - True if unlocked or false otherwise.
     */
    unlock(key: any): boolean;
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
export {};
