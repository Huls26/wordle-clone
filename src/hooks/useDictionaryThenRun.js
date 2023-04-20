// import { useState, useEffect } from 'react';
// import fetchDictionary from '@features/AppContainer/utils/fetchDictionary';

// export default function useDictionaryThenRun(word, callback) {
//   const [isValid, setIsValid] = useState(() => null);

//   useEffect(() => {
//     fetchDictionary(word, setIsValid);
//   }, [word]);

//   if (isValid) {
//     console.log(callback());
//     return isValid;
//   }
//   return isValid;
// }
