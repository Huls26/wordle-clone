import { PropTypes } from 'prop-types';

export default function DisplayWarning({ bg, text, isDisplay }) {
  const styles = `
    ${bg} px-20 py-8 opacity-90
    text-[#eceef2ee] text-3xl font-bold
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
