import PropTypes from 'prop-types';

export default function RowContainer({ rowBlock }) {
  return (
    <div
      className="flex space-x-1
      lg:space-x-2
      mb-1 lg:mb-2"
      data-testid="row-guess-container"
    >
      {rowBlock}
    </div>
  );
}

RowContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  rowBlock: PropTypes.array.isRequired,
};
