# State Signals

A minimal signal based state management solution with cherrys on top!

## Features

- Framework Agnostic
- Automatic Dependency Tracking In Effects
- Exposes createSignal, derived and effect primitives
- Lightweight, Zero Dependencies, Type Safe!

## Installation

```bash
npm install state-signal
```

## Usage

```typescript
import { createSignal, derived, effect } from 'state-signal';

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

```

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
