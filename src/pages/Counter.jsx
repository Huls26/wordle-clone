import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(() => null);

  function decrementBtn() {
    setCount(() => count - 1);
  }

  function incrementBtn() {
    setCount(() => count + 1);
  }

  function handleInputChange(event) {
    const { target } = event;
    const { value } = target;

    if (value.length) {
      setCount(() => parseInt(value, 10));
    } else {
      setCount(() => null);
    }
  }

  return (
    <main
      className="flex flex-col items-center space-y-3"
    >
      <input
        type="number"
        className="border max-w-[14em] px-3"
        value={count === null ? '' : count}
        placeholder="Set number"
        onChange={handleInputChange}
      />
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
          {count === null ? 0 : count}
        </h1>
        <button
          type="button"
          onClick={incrementBtn}
          className="bg-[#32a852] px-3 rounded-lg font-bold hover:bg-[#3dc462]"
        >
          +
        </button>
      </section>
    </main>
  );
}
