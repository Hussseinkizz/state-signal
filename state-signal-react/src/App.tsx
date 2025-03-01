import { useSignal } from "../hooks/useSignal";
import { countSignal } from "../store";

function Counter() {
  const [count, setCount] = useSignal(countSignal);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>
        Increment via useSignal
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <button onClick={() => (countSignal.value += 10)}>
        Increment Directly via Signal
      </button>
    </div>
  );
}

export default App;
