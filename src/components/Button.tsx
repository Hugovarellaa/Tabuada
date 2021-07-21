import { useState } from "react";

export function Button() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button type="button" onClick={increment}>
      {counter}
    </button>
  );
}
