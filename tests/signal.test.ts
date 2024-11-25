import { test, expect } from 'vitest';
import { createSignal, derived, effect } from '../src/lib';

let numSignal = createSignal(1);
let doubleSignal = derived(() => numSignal.value * 2);

let effectRun = false;

effect(() => (effectRun = true));

test('update signal', () => {
  numSignal.value += 2;
  expect(numSignal.value).toBe(3);
});

// since doubleSignal is computed from numSignal, it updates when numSignal updates
test('check derived signal', () => {
  expect(doubleSignal.value).toBe(6);
});

test('check signal effect', () => {
  expect(effectRun).toBe(true);
});
