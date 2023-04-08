import GuessBlock from './components/GuessBlock';

export default function BlockTable() {
  return (
    <section>
      <GuessBlock color="bg-green" guessLetter="W" />
      <GuessBlock color="bg-yellow" guessLetter="A" />
    </section>
  );
}
