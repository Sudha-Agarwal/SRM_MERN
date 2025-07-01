// JavaScript Random example
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("Random number between 1 and 10:", getRandomInt(1, 10));
