export default function collectLetterBg(array) {
  const collectLetter = [];
  const reduceBlocks = array.reduce((bgContainer, blocks) => {
    const { letter, color } = blocks;
    const isExist = bgContainer[color];

    if (color !== 'bg-green') {
      collectLetter.push(letter);
    }

    const notInclude = collectLetter.includes(letter);
    const isGreen = color === 'bg-green';
    // const isYellow = color === 'bg-yellow';
    if (isExist) {
      return { ...bgContainer, [color]: notInclude && isGreen ? `${isExist}` : `${isExist} ${letter}` };
    }

    return { ...bgContainer, [color]: notInclude && isGreen ? 'none' : letter };
  }, {});

  const formatBgName = Object.keys(reduceBlocks).map((bgColor) => {
    let prevLetter = '';
    const camelCase = bgColor.split('').reduce((camel, letter) => {
      let format = letter;
      if (prevLetter === '-') {
        format = letter.toUpperCase();
      }

      prevLetter = letter;
      return letter === '-' ? camel : [...camel, format];
    }, []).join('');

    return camelCase;
  });

  const renameObject = formatBgName.reduce((container, bgName, index) => {
    const value = Object.values(reduceBlocks);

    return { ...container, [bgName]: value[index] };
  }, {});

  return renameObject;
}
