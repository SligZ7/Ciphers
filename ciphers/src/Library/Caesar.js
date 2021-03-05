//Gets all possible 25 useful shifts of the given input
//  input: Given string of input
//  @Returns:
//    shifts: An array of strings. All possible 25 useful shifts of the given input
function getShifts(input) {
  let shifts = [];
  for (let i = 1; i < 26; i++) {
    shifts.push(shift(input, i));
  }
  return shifts;
}

//Shift the letters in the string by given number
//  str: string to shift
//  shiftNum: number to shift alphabet by (1-25)
//  @Returns:
//    shift: A string. str with letters shifted according to shiftNum
function shift(str, shiftNum) {
  str = str.toUpperCase();
  let shift = '';
  for (let i = 0; i < str.length; i++) {
    //Char Code 65 = 'A', Char Code 90 = 'Z'
    if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) { // If character not in alphabet, do not change.
      let charCode = str.charCodeAt(i) + shiftNum;
      if (charCode > 90) charCode -= 26;
      shift += String.fromCharCode(charCode);
    }
    else {
      shift += str.charAt(i);
    }
  }
  return shift;
}

export { getShifts, shift }
