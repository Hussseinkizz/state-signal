# State Signals

A minimal signal based state management solution with cherrys on top!

## Features

- Framework Agnostic
- Automatic Dependency Tracking In Effects
- Exposes createSignal, derived and effect primitives
- Provides signal history or snapshots
- Lightweight, Zero Dependencies, Type Safe!

## Installation

```bash
npm install state-signal
```

## How It Works

### 1. Basic Signals

Create and manage reactive state with simple signal premitive.

```typescript
import { createSignal } from 'state-signal';

// Counter example
const counter = createSignal(0);

// Get initial value
console.log(counter.value); // Logs: 0

// Update the value
counter.value += 1;
console.log(counter.value); // Logs: 1
```

### 2. Derived Signals

Automatically compute values based on other signals.

```typescript
import { createSignal, derived } from 'state-signal';

// Signals for first name and last name
const firstName = createSignal("John");
const lastName = createSignal("Doe");

// Derived signal to compute full name
const fullName = derived(() => `${firstName.value} ${lastName.value}`);

console.log(fullName.value); // Logs: "John Doe"

// Update one of the signals
firstName.value = "Jane";
console.log(fullName.value); // Logs: "Jane Doe"
```
Note: derived signals can't be directly updated, as in derivedSignal.value = something is not allowed to mantain semantics.

### 3. Effects

Effects run whenever signals they depend on change.

```typescript
import { createSignal, effect } from 'state-signal';

// Signal to track room temperature
const roomTemperature = createSignal(25);

// Effect to log temperature changes, runs everytime we update roomTemperature signal
effect(() => {
  console.log(`Temperature updated: ${roomTemperature.value}°C`);
});

// Update the temperature, triggering the effect
roomTemperature.value = 28; // Logs: "Temperature updated: 28°C"
roomTemperature.value = 22; // Logs: "Temperature updated: 22°C"
```

### 4. Signal History

Track and access past states of a signal, configurable per signal.

```typescript
import { createSignal } from 'state-signal';

// Signal to track a movie series' release years with history enabled
const movieReleaseYears = createSignal(2001, { history: true, maxHistory: 3 });

// Update release years to build a history
movieReleaseYears.value = 2002; // First sequel
movieReleaseYears.value = 2005; // Second sequel
movieReleaseYears.value = 2010; // Third sequel

// Access history
console.log(movieReleaseYears.history(-1)); // Logs: 2010 (most recent value)
console.log(movieReleaseYears.history(-2)); // Logs: 2005 (second most recent value)
console.log(movieReleaseYears.history()); // Logs: [2002, 2005, 2010] (entire history)

// Exceeding maxHistory
movieReleaseYears.value = 2020; // Fourth sequel, oldest entry removed
console.log(movieReleaseYears.history()); // Logs: [2005, 2010, 2020]

// Out-of-bounds access
console.log(movieReleaseYears.history(-5));
// Logs: "state signal error: Requested history index (-5) exceeds current size (3)..."

// Signal without history
const singleYearSignal = createSignal(1995, { history: false });
console.log(singleYearSignal.history(-1));
// Logs: "History is deactivated for this signal."
```
Note: by default history is enabled for each signal and upto 10 snapshots by default.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## Quality Checks

Before each PR is merged, the following checks are automatically run:

- TypeScript type checking
- ESLint validation
- Unit tests
- Export validation
- Bundle size checks

See the [GUIDE](./GUIDE.md) for more info!

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Support

- Issues: [GitHub Issues](https://github.com/Hussseinkizz/state-signal/issues)
- Discussions: [GitHub Discussions](https://github.com/Hussseinkizz/state-signal/discussions)

Built with ❤️ By [Hussein Kizz](hssnkizz@gmail.com)
