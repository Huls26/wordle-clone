// import fetchDictionaryThenRun from '@features/AppContainer/utils/fetchDictionaryThenRun';

export default async function fetchData(setData, level) {
  let maxValue;

  if (level === 1) {
    maxValue = 5;
  } else if (level === 2) {
    maxValue = 6;
  } else if (level === 3) {
    maxValue = 7;
  } else {
    maxValue = 8;
  }

  // https://random-word-api.vercel.app/
  try {
    // const res = await fetch('https://random-word-api.herokuapp.com/word');
    const GET = `https://random-word-api.vercel.app/api?words=6&length=${maxValue}`;
    const res = await fetch(GET);
    const data = await res.json();

    if (data) {
      setData(data);
    }
  } catch (error) {
    setData(['bonus']);
  }
}
