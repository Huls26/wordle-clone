export default async function fetchDictionaryThenRun(toCheck, callback) {
  try {
    const checkWord = `https://api.dictionaryapi.dev/api/v2/entries/en/${toCheck}`;
    const res = await fetch(checkWord);
    const isValidWord = await res.json();
    const isArray = Array.isArray(isValidWord);

    if (isArray) {
      callback();
    }
    return isArray;
  } catch (error) {
    throw Error(error.message);
  }
}
