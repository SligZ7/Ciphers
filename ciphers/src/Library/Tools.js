  // Counts frequency of letters, digraphs (two letters) and trigraphs (three letters).
  //  text: string to be analyzed.
  //  @Returns:
  //    text: Given text that has been substituted based on the keyword given.
  function letterFrequencyAnalysis(text) {
    const letters = text.toLowerCase().match(/[a-z]/g); // ignore any other characters beside a-z.
    const letFreq = {}; const diFreq = {}; const triFreq = {};
    if (letters && letters.length > 2) {
      // Loop through letters, add to hashmaps if not already and increment if already added.
      for (let i=0; i<letters.length-2; i++) {
            (letFreq[letters[i]]) ? letFreq[letters[i]] += 1 : letFreq[letters[i]] = 1;
            (diFreq[(letters[i] + letters[i+1])]) ? diFreq[(letters[i] + letters[i+1])] += 1 : diFreq[(letters[i] + letters[i+1])] = 1;
            (triFreq[(letters[i] + letters[i+1] + letters[i+2])]) ? triFreq[(letters[i] + letters[i+1] + letters[i+2])] += 1 : triFreq[(letters[i] + letters[i+1] + letters[i+2])] = 1;
      }
      // Get the last two letters and last digraph
      const l = letters.length; // For Readability
          (letFreq[letters[l-2]]) ? letFreq[letters[l-2]] += 1 : letFreq[letters[l-2]] = 1;
          (letFreq[letters[l-1]]) ? letFreq[letters[l-1]] += 1 : letFreq[letters[l-1]] = 1;
          (diFreq[(letters[l-2] + letters[l-1])]) ? diFreq[(letters[l-2] + letters[l-1])] += 1 : diFreq[(letters[l-2] + letters[l-1])] = 1;
    }
    return {monograms: letFreq, digrams: diFreq, trigrams: triFreq};
  }

  // Gets the frequencies for the given letters given how they are grouped.
  // i.e. Every 3rd letter of 'This is an example.' would output
  // [{t: 1, s: 1, a: 1, x: 1, p: 1} {h: 1, i: 1, n: 1, a: 1, l: 1} {i: 1, s: 1, e: 2, m: 1}]
  //  letters: An array of alphabetical lower case characters.
  //  @Returns:
  //    frequencies: An array of hashmaps that contain each letter groupings frequencies.
  function getIthLetterFrequencies(letters, i) {
    const frequencies = [];
    // Set up array of hashes
    for (let j=0; j<i; j++) {
      frequencies.push({}); // Need to change maybe or indexOfCoincidence method.
    }

    if (letters) {
      for (let k=0; k<letters.length; k++) {
            (frequencies[k%i][letters[k]]) ? frequencies[k%i][letters[k]] += 1 : frequencies[k%i][letters[k]] = 1;
      }
    }
    return frequencies;
  }

  // Calculates the index of coincidence
  //  frequencies: A hashmap comprised of lowercase alphabet characters mapped to the amount of times it appears in a given text.
  //  @Returns:
  //    ioc: A calculated number using the formula for ioc: https://en.wikipedia.org/wiki/Index_of_coincidence.
  function indexOfCoincidence(frequencies) {
    const length = Object.values(frequencies).reduce(
        function(accumulator, currentValue) {
          return accumulator + currentValue;
        });
    let ioc = 0;
    // Iterate through alphabet
    for (let i=0; i<26; i++) {
      const current = frequencies[(10+i).toString(36)];
      if (current > 0) ioc += (current * (current - 1))/(length*(length - 1));
    }
    return ioc;
  }

  // Calculates the index of coincidences for different letter pairing groups.
  //  letters: an array of alphabetical lowercase letters
  //  @Returns:
  //    iocs: An array of calculated index of coincidences for different letter pairing groups.
  function calculateIndexOfCoincidences(letters) {
    const iocs = [];
    for (let i=1; i<=20; i++) {
      let freqs = getIthLetterFrequencies(letters, i);
      freqs = freqs.map((freq) => indexOfCoincidence(freq)); // Calculate ioc for each set of text
      iocs.push(freqs.reduce((accum, currentVal) => accum + currentVal)/i); // Push Average
    }
    return iocs;
  }

  export {calculateIndexOfCoincidences , letterFrequencyAnalysis}
