import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(() => null);
  const [incrementor, setIncrementor] = useState(() => 1);

  function validValueUtils(value, callback) {
    const maximumValue = 100;
    const minimumValue = -100;
    const parseValue = parseInt(value, 10);
    let isValidValue = value !== null ? value : 0;

    if (parseValue >= maximumValue) {
      isValidValue = maximumValue;
    } else if (parseValue <= minimumValue) {
      isValidValue = minimumValue;
    }

    if (`${value}`.length) {
      callback(isValidValue);
    } else {
      setCount(() => null);
    }
  }

  function minMaxValue(value) {
    const maximumValue = 100;
    const minimumValue = -100;

    if (value >= maximumValue) {
      return maximumValue;
    }

    if (value <= minimumValue) {
      return minimumValue;
    }
    return value;
  }

  function decrementBtn() {
    const minimumValue = -100;
    validValueUtils(count, (isValidValue) => {
      if (isValidValue !== minimumValue) {
        setCount(() => minMaxValue(isValidValue - incrementor));
      }
    });
  }

  function incrementBtn() {
    const minimumValue = 100;
    validValueUtils(count, (isValidValue) => {
      if (isValidValue !== minimumValue) {
        setCount(() => minMaxValue(isValidValue + incrementor));
      }
    });
  }

  function handleInputChange(event) {
    const { target } = event;
    const { value } = target;

    validValueUtils(value, (isValidValue) => setCount(() => parseInt(isValidValue, 10)));
  }

  function handleIncrementor(event) {
    const { target } = event;
    const { value } = target;
    const isValidValue = value.length ? value : 1;

    setIncrementor(() => parseInt(isValidValue, 10));
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
          { count === null ? 0 : count }
        </h1>
        <button
          type="button"
          onClick={incrementBtn}
          className="bg-[#32a852] px-3 rounded-lg font-bold hover:bg-[#3dc462]"
        >
          +
        </button>
      </section>
      <input type="number" placeholder="Enter Incrementor" onChange={handleIncrementor} />
    </main>
  );
}
