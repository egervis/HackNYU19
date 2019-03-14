"use strict";

/**
 * Converts a string of stuff separated by commas to an array.
 * @param  {string} str The comma separated list string.
 * @return {Array<string>} The array of strings.
 */
export const convertStringToArray = (str) => {
  return str.split(',');
};

/**
 * Converts an array of stuff to a comma separated string.
 * Optional argument to pass in a function that will specify what string to extract.
 * @param  {Array} arr The array to parse into a list.
 * @param  {Function} selector [Optional] Function to be used on each item of the array. Function should return a string. Ignore if not needed.
 * @return {string} The comma separated list.
 */
export const convertArrayToString = (arr, selector = undefined) => {
  let output = '';
  for(let i=0; i<arr.length-1; i++) {
    let string = selector ? selector(arr[i]) : arr[i];
    output = output.concat(string).concat(',');
  }
  return output.concat(arr[arr.length-1]);
};
