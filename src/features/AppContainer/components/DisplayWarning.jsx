import { PropTypes } from 'prop-types';

export default function DisplayWarning({ bg, text, isDisplay }) {
  const styles = `
    ${bg} px-7 py-4 md:px-13 md:py-[1em] lg:px-20 md:py-9 opacity-90
    text-[#eceef2ee] text-2xl lg:text-3xl font-bold
    rounded-lg
    absolute z-50
    top-[9em] md:top-[8em]
    animate-bounce
    max-w-[16em]
    md:max-w-full
    `;
  const display = isDisplay ? (
    <section
      className={styles}
      data-testid="display-warning"
    >
      {text}
    </section>
  ) : null;

  return display;
}

DisplayWarning.propTypes = {
  bg: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isDisplay: PropTypes.bool.isRequired,
};
