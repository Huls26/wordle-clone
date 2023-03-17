import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(() => 0);

  function decrementBtn() {
    setCount(() => count - 1);
  }

  function incrementBtn() {
    setCount(() => count + 1);
  }
  return (
    <section
      className="flex space-x-3 justify-center text-xl"
    >
      <button
        type="button"
        onClick={decrementBtn}
        className="bg-[#32a852] px-3 rounded-lg font-bold hover:bg-[#3dc462]"
      >
        -
      </button>
      <h1>
        Counter
        {' '}
        {count}
      </h1>
      <button
        type="button"
        onClick={incrementBtn}
        className="bg-[#32a852] px-3 rounded-lg font-bold hover:bg-[#3dc462]"
      >
        +
      </button>
    </section>
  );
}
