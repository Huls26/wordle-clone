export default function createBlockTable(length) {
  const setRow = Array(length).fill({ letter: '', color: 'none' });
  const setTableBlocks = Array(6).fill(setRow);

  return setTableBlocks;
}
