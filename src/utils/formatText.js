//  * Capitalizes the first letter of every word.

const capitalizeWords = (value = "") => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export default capitalizeWords;
