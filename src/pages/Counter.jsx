import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(() => null);

  function decrementBtn() {
    const minimumValue = -100;

    if (count >= minimumValue) {
      setCount(() => minimumValue);
    } else {
      setCount(() => count - 1);
    }
  }

  function incrementBtn() {
    const maximumValue = 100;

    if (count >= maximumValue) {
      setCount(() => maximumValue);
    } else {
      setCount(() => count + 1);
    }
  }

  function handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const maximumValue = 100;
    const minimumValue = -100;
    const parseValue = parseInt(value, 10);
    let isValidValue = value;

    if (parseValue >= maximumValue) {
      isValidValue = maximumValue;
    } else if (parseValue <= minimumValue) {
      isValidValue = minimumValue;
    }

    if (value.length) {
      setCount(() => parseInt(isValidValue, 10));
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