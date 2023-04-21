import fetchDictionaryThenRun from '@features/AppContainer/utils/fetchDictionaryThenRun';

export default async function fetchData(setData) {
  const minimumValue = 5;
  const maxValue = 8;

  function runCondition(data) {
    if ((data && data.length < minimumValue) || data.length > maxValue) {
      fetchData(setData);
    } else {
      setData(data);
    }
  }
  try {
    const res = await fetch('https://random-word-api.herokuapp.com/word');
    const [data] = await res.json();

    if (data) {
      fetchDictionaryThenRun(data, () => runCondition(data))
        .then((inDictionary) => (!inDictionary && fetchData(setData)));
    }
  } catch (error) {
    setData('Bonus');
  }
}
