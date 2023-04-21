import { PropTypes } from 'prop-types';

export default function DisplayWarning({ bg, text }) {
  const styles = `
    ${bg} px-20 py-8 opacity-90
    text-[#eceef2ee] text-3xl font-bold
    rounded-lg
    absolute z-50
    top-[6em]
    `;
  return (
    <section
      className={styles}
    >
      {text}
    </section>
  );
}

DisplayWarning.propTypes = {
  bg: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
