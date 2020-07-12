  //Performs monoalphabetic substituion.
  //  keyword: String of letters used to create new alphabet to perform substituion.
  //  text: String to encrypt/decrypt.
  //  @Returns:
  //    output: Given text that has been substituted based on the keyword given.
  function monoalphabeticCipher(keyword, text, mode=0){
    var output = ''
    var oldToNewHash = getOldToNewAlphabetHash(getCipherAlphabet(keyword), mode);
    text = mode ? text.toUpperCase() : text.toLowerCase();
    for(var i=0; i<=text.length; i++){
      if(text.charAt(i).match(/[a-zA-Z]/)) output += oldToNewHash[text.charAt(i)];
    }
    return output;
  }

  //Creates cipher alphabet from keyword.
  //Cipher alphabet is constructed removing any repetitions in keyword and adding any missing letters to the end
  //in the order they appear in the normal alphabet.
  //  keyword: String of letters used to create new alphabetic to perform substituion.
  //  @Returns:
  //    cipherAlpha: Cipher alphabet constructed using keyword.
  function getCipherAlphabet(keyword){
    var letters = keyword.toUpperCase().match(/[A-Z]/g); //ignore any other characters beside a-z.
    var regAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var cipherAlpha = '';

    if(letters){
      var i = 0;
      while (i < letters.length && cipherAlpha.length !== 26) {
        if(cipherAlpha.indexOf(letters[i]) < 0) {
          cipherAlpha += letters[i];
          regAlpha = regAlpha.replace(letters[i], '');
        }
        i++;
      }
    }
    if(cipherAlpha.length < 26) cipherAlpha += regAlpha; //Fill rest of new alphabet with remaining letters.
    return cipherAlpha;
  }

  //Creates hashmap linking the old alphabet to the new, for ease of replacing text.
  //  keyword: String of letters used to create new alphabetic to perform substituion.
  //  mode: Integer of one or zero. 0: Encrypt, 1: Decrypt.
  //  @Returns:
  //    hash: Maps old to new alphabet
  function getOldToNewAlphabetHash(cipherAlpha, mode=0){
    var regAlpha = 'abcdefghijklmnopqrstuvwxyz';
    var hash = {};

    for(var i=0; i<cipherAlpha.length; i++){
      mode ? hash[cipherAlpha.charAt(i)] = regAlpha.charAt(i) : hash[regAlpha.charAt(i)] = cipherAlpha.charAt(i);
    }
    return hash;
  }

  export{monoalphabeticCipher, getCipherAlphabet, getOldToNewAlphabetHash}
