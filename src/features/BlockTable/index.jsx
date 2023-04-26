import { PropTypes } from 'prop-types';
import GuessBlock from './components/GuessBlock';
import RowContainer from './components/RowContainer';

export default function BlockTable({ blocksTable }) {
  // render the guessblock
  // this is a rowBlocks
  function row(array) {
    return array.map((guess, idx) => {
      const { letter, color } = guess;
      return <GuessBlock key={idx} color={color} guessLetter={letter} />;
    });
  }

  // render whole the block
  const tableBlocks = blocksTable.map((rowBlock, idx) => (
    <RowContainer rowBlock={row(rowBlock)} key={idx} />
  ));

  return (
    <section className="mb-2 md:mb-3 lg:mb-6">
      { tableBlocks }
    </section>
  );
}

BlockTable.propTypes = {
  blocksTable: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        letter: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ).isRequired,
  ).isRequired,

};
