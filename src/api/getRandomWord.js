// import fetchDictionaryThenRun from '@features/AppContainer/utils/fetchDictionaryThenRun';

export default async function fetchData(setData, level) {
  // const minimumValue = 5;
  let maxValue;

  if (level === 1) {
    maxValue = 5;
  } else if (level === 2) {
    maxValue = 6;
  } else if (level === 3) {
    maxValue = 7;
  }

  // console.log(maxValue, level);
  // function runCondition(data) {
  //   if (data && data.length === maxValue) {
  //     setData(data);
  //   } else {
  //     fetchData(setData, maxValue);
  //   }
  // }

  // https://random-word-api.vercel.app/
  try {
    // const res = await fetch('https://random-word-api.herokuapp.com/word');
    const GET = `https://random-word-api.vercel.app/api?words=6&length=${maxValue}`;
    const res = await fetch(GET);
    const data = await res.json();

    // console.log(data);
    if (data) {
      // fetchDictionaryThenRun(data, () => runCondition(data))
      //   .then((inDictionary) => (!inDictionary && fetchData(setData)));
      setData(data);
    }
  } catch (error) {
    setData('Bonus');
  }
}
