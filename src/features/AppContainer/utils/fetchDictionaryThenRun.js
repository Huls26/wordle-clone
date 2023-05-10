export default async function fetchDictionaryThenRun(toCheck, callback, ERROR_HANDLING = '', validWords = []) {
  try {
    const checkWord = `https://api.dictionaryapi.dev/api/v2/entries/en/${toCheck}`;
    const res = await fetch(checkWord);
    const isValidWord = await res.json();
    const setArray = [...validWords, 'every'];
    const isArray = setArray.includes(toCheck.toLowerCase()) || Array.isArray(isValidWord);

    if (isArray) {
      callback();
    }
    return isArray;
  } catch (error) {
    ERROR_HANDLING();
    throw new Error(error.message);
  }
}
