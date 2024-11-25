import { derived, effect, createSignal } from "../index";

const button = document.querySelector("#btn");

let count = createSignal(0);

let double = derived(() => count.value * 2);

button?.addEventListener("click", () => {
  count.value++;
});

effect(() => {
  console.log(`changed: ${count.value}`);
});

effect(() => {
  console.log(`double changed: ${double.value}`);
});

effect(() => {
  if (button) {
    button.innerHTML = `clicked: ${count.value}`;
  }
});
