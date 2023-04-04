const wordBank = [
  'text',
  '123',
  'sample',
  'dog',
  'it',
  'testing',
];

export default function mockRandomWords() {
  const getW = Math.floor(Math.random() * wordBank.length);
  const data = wordBank[getW];

  return data;
}
