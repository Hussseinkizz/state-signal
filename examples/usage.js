"use strict";
import { createSignal, derived, effect } from "./state-signal";

// Create some signals
const signalA = createSignal(1);
const signalB = createSignal(2);

// Create a derived signal based on signalA and signalB
const sum = derived(() => signalA.value + signalB.value);

// Create an effect to log the value of the sum whenever it changes
effect(() => {
  console.log(`Sum is: ${sum.value}`);
});

// Initial logging when the signals are created
// Logs: "Sum is: 3" (1 + 2)

// Update signalA and signalB, which triggers the effect
signalA.value = 5; // Logs: "Sum is: 7" (5 + 2)
signalB.value = 3; // Logs: "Sum is: 8" (5 + 3)

// Attempting to manually update the derived signal logs an error
sum.value = 10; // Logs: "Error: Derived signals are computed values and cannot be manually updated."
