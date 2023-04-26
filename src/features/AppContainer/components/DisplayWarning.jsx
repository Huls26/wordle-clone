import { PropTypes } from 'prop-types';

export default function DisplayWarning({ bg, text, isDisplay }) {
  const styles = `
    ${bg} px-10 py-4 md:px-20 md:py-8 opacity-90
    text-[#eceef2ee] text-base md:text-3xl font-bold
    rounded-lg
    absolute z-50
    top-[6em]
    animate-bounce
    `;
  const display = isDisplay ? (
    <section
      className={styles}
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
