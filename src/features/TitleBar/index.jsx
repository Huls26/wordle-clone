import GuessBlock from '../BlockTable/components/GuessBlock';

export default function TitleBar() {
  let title = [
    { letter: 'W', bg: 'bg-gray-dark shadow-md' },
    { letter: 'O', bg: 'bg-green shadow-md' },
    { letter: 'R', bg: 'bg-yellow shadow-md' },
    { letter: 'D', bg: 'bg-gray-dark shadow-md' },
    { letter: 'L', bg: 'bg-gray-dark shadow-md' },
    { letter: 'E', bg: 'bg-yellow shadow-md' },
    { letter: ' ', bg: '' },
    { letter: 'C', bg: 'bg-green shadow-md' },
    { letter: 'L', bg: 'bg-gray-dark shadow-md' },
    { letter: 'O', bg: 'bg-yellow shadow-md' },
    { letter: 'N', bg: 'bg-green shadow-md' },
    { letter: 'E', bg: 'bg-gray-dark shadow-md' },
  ];

  title = title.map((object, idx) => {
    const { letter, bg } = object;
    // eslint-disable-next-line react/no-array-index-key
    return <GuessBlock key={idx} guessLetter={letter} color={bg} />;
  });

  return (
    <header className="mb-8">
      <h1 className="flex space-x-2">
        { title }
      </h1>
    </header>
  );
}
