"use strict";

// Converts a string of stuff separated by commas to an array.
export const convertStringToArray = (str) => {
  return str.split(',');
};

// Converts an array of stuff to a comma separated string.
export const convertArrayToString = (arr) => {
  let output = '';
  for(let i=0; i<arr.length-1; i++) {
    output = output.concat(arr[i]).concat(',');
  }
  return output.concat(arr[arr.length-1]);
};
