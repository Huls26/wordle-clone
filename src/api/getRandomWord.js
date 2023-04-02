export default async function fetchData(setData) {
  try {
    const res = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await res.json();
    setData(data);
  } catch (error) {
    setData('Something went wrong');
  }
}
