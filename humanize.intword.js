// Modification of https://github.com/milanvrekic/JS-humanize/blob/master/humanize.js
/*!
intword
Converts a large integer to a friendly text representation. Works best for numbers over 1 million.

Examples:
1000000 becomes 1.0 million.
1200000 becomes 1.2 million.
1200000000 becomes 1.2 billion.
*/

function sliceToFirstDecimal(number) {
  var numStr = number + '';

  // If there is no decimal, add one
  if (numStr.indexOf('.') === -1) {
    numStr += '.';
  }

  // Pad the number
  while (numStr.length < 3) {
    numStr = numStr + '0';
  }

  // Slice the excess and return
  var retVal  = numStr.slice(0, 3);
  return retVal;
}

module.exports = function (number) {
  number = parseInt(number, 10);
  if( number < 1e3 ) {
    return number;
  } else if( number < 1e6 ) {
    return sliceToFirstDecimal(number / 1e3) + "k";
  } else if( number < 1e9 ) {
    return sliceToFirstDecimal(number / 1e6) + "m";
  } else if( number < 1e12 ) { //senseless on a 32 bit system probably.
    return sliceToFirstDecimal(number / 1e9) + "b";
  } else if( number < 1e15 ) {
    return sliceToFirstDecimal(number / 1e12) + "t";
  }
  return "" + number; // too big.
};