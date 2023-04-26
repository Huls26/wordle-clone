import GuessBlock from '../BlockTable/components/GuessBlock';

export default function TitleBar() {
  let titleWordle = [
    { letter: 'W', bg: 'bg-gray-dark shadow-md' },
    { letter: 'O', bg: 'bg-green shadow-md' },
    { letter: 'R', bg: 'bg-yellow shadow-md' },
    { letter: 'D', bg: 'bg-gray-dark shadow-md' },
    { letter: 'L', bg: 'bg-gray-dark shadow-md' },
    { letter: 'E', bg: 'bg-yellow shadow-md' },
  ];

  let titleClone = [
    { letter: 'C', bg: 'bg-green shadow-md' },
    { letter: 'L', bg: 'bg-gray-dark shadow-md' },
    { letter: 'O', bg: 'bg-yellow shadow-md' },
    { letter: 'N', bg: 'bg-green shadow-md' },
    { letter: 'E', bg: 'bg-gray-dark shadow-md' },
  ];

  titleWordle = titleWordle.map((object, idx) => {
    const { letter, bg } = object;
    // eslint-disable-next-line react/no-array-index-key
    return <GuessBlock key={idx} guessLetter={letter} color={bg} />;
  });

  titleClone = titleClone.map((object, idx) => {
    const { letter, bg } = object;
    // eslint-disable-next-line react/no-array-index-key
    return <GuessBlock key={idx} guessLetter={letter} color={bg} />;
  });
  return (
    <header className="mb-3 md:mb-5 lg:mb-8 flex flex-col justify-center md:flex-row md:space-x-10">
      <h1 className="flex space-x-1 mb-1 md:space-x-2">
        { titleWordle }
      </h1>
      <h1 className="flex space-x-1 justify-center md:space-x-2">
        { titleClone }
      </h1>
    </header>
  );
}
