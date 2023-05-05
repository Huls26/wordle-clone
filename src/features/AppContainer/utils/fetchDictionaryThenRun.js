export default async function fetchDictionaryThenRun(toCheck, callback, ERROR_HANDLING = '', validWords = []) {
  try {
    const checkWord = `https://api.dictionaryapi.dev/api/v2/entries/en/${toCheck}`;
    const res = await fetch(checkWord);
    const isValidWord = await res.json();
    const isArray = Array.isArray(isValidWord);

    if (isArray || validWords.includes(toCheck.toLowerCase())) {
      callback();
    }
    return isArray;
  } catch (error) {
    ERROR_HANDLING();
    throw new Error(error.message);
  }
}
