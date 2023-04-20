export default function checkGuessWord(targetWord, guessWord) {
  const split = targetWord.toUpperCase().split('');

  const checkingWord = guessWord.map((block, idx) => {
    const newBlock = { ...block };
    const { letter } = block;

    newBlock.color = 'bg-gray-dark';

    if (split.includes(letter)) {
      newBlock.color = 'bg-yellow';
    }

    if (letter === split[idx]) {
      console.log(block);
      newBlock.color = 'bg-green';
    }

    return newBlock;
  });

  return checkingWord;
}
