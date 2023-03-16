export default async function fetchData(setData) {
  const res = await fetch('https://random-word-api.herokuapp.com/word');
  const data = await res.json();
  setData(data);
}
