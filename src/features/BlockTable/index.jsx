import GuessBlock from './components/GuessBlock';

export default function BlockTable() {
  return (
    <section>
      <GuessBlock color="green" guessLetter="W" />
      <GuessBlock color="yellow" guessLetter="A" />
    </section>
  );
}
