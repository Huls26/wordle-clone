import GuessBlock from '../BlockTable/components/GuessBlock';

export default function TitleBar() {
  let title = [
    { letter: 'W', bg: 'bg-gray-dark' },
    { letter: 'O', bg: 'bg-green' },
    { letter: 'R', bg: 'bg-yellow' },
    { letter: 'D', bg: 'bg-gray-dark' },
    { letter: 'L', bg: 'bg-gray-dark' },
    { letter: 'E', bg: 'bg-yellow' },
    { letter: ' ', bg: '' },
    { letter: 'C', bg: 'bg-green' },
    { letter: 'L', bg: 'bg-gray-dark' },
    { letter: 'O', bg: 'bg-yellow' },
    { letter: 'N', bg: 'bg-green' },
    { letter: 'E', bg: 'bg-gray-dark' },
  ];

  title = title.map((object, idx) => {
    const { letter, bg } = object;
    // eslint-disable-next-line react/no-array-index-key
    return <GuessBlock key={idx} guessLetter={letter} color={bg} />;
  });

  return (
    <header className="mb-8">
      <div className="flex space-x-2">
        { title }
      </div>
    </header>
  );
}
