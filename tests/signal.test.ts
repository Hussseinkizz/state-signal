import { test, expect } from "vitest";
import { createSignal, derived, effect } from "../src/lib";

let numSignal = createSignal(1);
let doubleSignal = derived(() => numSignal.value * 2);

const counter = createSignal(0);

const double = derived(() => counter.value * 2);

let nameSignal = createSignal("John Doe");
let key = nameSignal.lock();

let effectRun = false;

effect(() => (effectRun = true));

test("update signal", () => {
  numSignal.value += 2;
  expect(numSignal.value).toBe(3);
});

test("lock signal - no change", () => {
  nameSignal.value = "kizz";
  expect(nameSignal.value).toBe("John Doe");
});

test("lock signal - change", () => {
  nameSignal.unlock(key);
  nameSignal.value = "kizz";
  expect(nameSignal.value).toBe("kizz");
});

// since doubleSignal is computed from numSignal, it updates when numSignal updates
test("check derived signal", () => {
  expect(doubleSignal.value).toBe(6);
  counter.value += 1;
  expect(double.value).toBe(2);
});

test("check signal effect", () => {
  expect(effectRun).toBe(true);
});

test("check signal history", () => {
  numSignal.value++;
  expect(numSignal.history(-2)).toBe(1);
  expect(numSignal.history()).toHaveLength(3);
});

test("avoid recursive effect triggers", () => {
  const signal = createSignal(0);
  let runCount = 0;

  effect(() => {
    runCount++;
    if (signal.value < 2) {
      signal.value++;
    }
  });

  expect(signal.value).toBe(1); // Signal should stabilize at 1
  expect(runCount).toBe(1); // Effect should run only once
});

test("effect with multiple signals and external updates", () => {
  const signalA = createSignal(0);
  const signalB = createSignal(0);
  const signalC = createSignal(0);
  let runCount = 0;

  effect(() => {
    runCount++;
    const a = signalA.value;
    const b = signalB.value;
    if (a < 2) {
      signalA.value++;
    }
    const c = signalC.value;
  });

  // Update signalB outside the effect
  signalB.value++;
  signalC.value = 2;

  expect(signalA.value).toBe(2); // Stabilized at 2
  expect(signalB.value).toBe(1); // Incremented externally
  expect(signalC.value).toBe(2); // changed externally
  expect(runCount).toBe(3); // Effect runs twice + 1 initial run!
});

// note: the signal is not taking into account the current effect
