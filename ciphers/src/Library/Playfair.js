import { getCipherAlphabet } from './Monoalpha';

// Performs Playfair substituion.
//  keyword: String of letters used to create new alphabets to perform substituion.
//  text: String to encrypt/decrypt.
//  mode: indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  letterToReplace: Square can only have 25 letters, so one must be replaced. j is usually replaced by i.
//  replacement: letter that will be used as replacement.
//  @Returns:
//    output: Given text that has been substituted based on the keyword given.
function playfairCipher(keyword, text, mode = 0, letterToReplace = 'j', replacement = 'i') {
  let output = '';
  const square = createSquare(keyword);
  const hash = createHash(square);
  let letters = text.toLowerCase().match(/[a-z]/g);
  if (mode === 0) letters = formatText(letters); // Reformat text for encryption
  if (letters.length % 2 === 0) { // Has to be even since letters are paired together to encipher/decipher
    for (let i = 0; i < letters.length; i += 2) {
      // Perform encryption/decryption based on case.
      if (hash.row[letters[i]] === hash.row[letters[i + 1]]) { // Row Case
        output += rowCase(square, hash.row[letters[i]], hash.col[letters[i]], hash.col[letters[i + 1]], mode);
      } else if (hash.col[letters[i]] === hash.col[letters[i + 1]]) { // Column case
        output += colCase(square, hash.col[letters[i]], hash.row[letters[i]], hash.row[letters[i + 1]], mode);
      } else { // Square case
        output += squareCase(square, hash.row[letters[i]], hash.col[letters[i]], hash.row[letters[i + 1]], hash.col[letters[i + 1]]);
      }
    }
  }
  return mode ? output : output.toUpperCase();
}

// Modifies text for playfair
//  text: String to encrypt/decrypt.
//  letterToReplace: Square can only have 25 letters, so one must be replaced. j is usually replaced by i.
//  replacement: letter that will be used as replacement.
//  @Returns:
//    letters: an array of letters
function formatText(letters, letterToReplace, replacement) {
  for (let i = 0; i < letters.length; i += 2) {
    if (letters[i] === letterToReplace) letters[i] = replacement; // See if letter need to be replaced.
    if (!letters[i + 1]) { // Add filler, but don't create repetitions (leads to infinite looping)
      if (letters[i] === 'x') {
        letters.push('z');
      } else {
        letters.push('x');
      }
    }
    if (letters[i + 1] === letterToReplace) letters[i + 1] = replacement; // See if letter need to be replaced.
    if (letters[i] === letters[i + 1]) {// Need to ensure letters are not the same
      if (letters[i] === 'x') {
        letters.splice(i + 1, 0, 'z');
      } else {
        letters.splice(i + 1, 0, 'x');
      }
    }
  }
  return letters;
}

// Square case, when not in same row or column.
//  square: Playfair square being used. Multidimensional Array.
//  rowA: row of first letter.
//  rowB: row of second letter.
//  colA: column of first letter.
//  colB: column of second letter.
//  @Returns: Two letters encrypted/decrypted.
function squareCase(square, rowA, colA, rowB, colB) {
  return (square[rowA][colB] + square[rowB][colA]);
}

// Row case, when in the same row. Encrypt go to the right one, Decrypt do to the left one.
//  square: Playfair square being used. Multidimensional Array.
//  row: row of letters.
//  colA: column of first letter.
//  colB: column of second letter.
//  mode: indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  @Returns: Two letters encrypted/decrypted.
function rowCase(square, row, colA, colB, mode = 0) {
  if (mode === 0) {
    (colA + 1 > 4) ? colA -= 4 : colA++;
    (colB + 1 > 4) ? colB -= 4 : colB++;
    return (square[row][colA] + square[row][colB]);
  } else {
    (colA - 1 < 0) ? colA += 4 : colA--;
    (colB - 1 < 0) ? colB += 4 : colB--;
    return (square[row][colA] + square[row][colB]);
  }
}

// Column case, when in the same column. Encrypt go to the down one, Decrypt do to the up one.
//  square: Playfair square being used. Multidimensional Array.
//  rowA: row of first letter.
//  rowB: row of second letter.
//  col: column of letters.
//  mode: indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  @Returns: Two letters encrypted/decrypted.
function colCase(square, col, rowA, rowB, mode = 0) {
  if (mode === 0) {
    (rowA - 1 < 0) ? rowA += 4 : rowA--;
    (rowB - 1 < 0) ? rowB += 4 : rowB--;
    return (square[rowA][col] + square[rowB][col]);
  } else {
    (rowA + 1 > 4) ? rowA -= 4 : rowA++;
    (rowB + 1 > 4) ? rowB -= 4 : rowB++;
    return (square[rowA][col] + square[rowB][col]);
  }
}

// Creates Plafair square based on keyword. Used keyword with letter repetitions ignored
// and add any missing letters to the end(except letterToReplace) in the order they normally
// appear.
//  keyword: string used to construct square.
//  letterToReplace: letter to ignore when creating square. Usually j.
//  @Returns:
//    square: Plafair square. Multidimensional array of single letters.
function createSquare(keyword, letterToReplace = 'j') {
  let i; // the first-order index in square
  let j; // the second order index in square
  const square = [];
  keyword = getCipherAlphabet(keyword).toLowerCase().replace(letterToReplace, ''); // Still needs to replace letter with intended replacement when encrypting
  for (i = 0; i < 5; i++) {
    square[i] = [];
    for (j = 0; j < 5; j++) {
      square[i][j] = keyword.charAt(i * 5 + j);
    }
  }
  return square;
}

// Creates row and col hash of the letters in square.
//  square: Playfair square being used. Multidimensional array.
// @Returns:
//  hash: returns object containing rowHash and colHash.
function createHash(square) {
  let i; let j; const rowHash = {}; const colHash = {};
  for (i = 0; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      rowHash[square[i][j]] = i;
      colHash[square[i][j]] = j;
    }
  }
  return { row: rowHash, col: colHash };
}

export { playfairCipher, createSquare }
