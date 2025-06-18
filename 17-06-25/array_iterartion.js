// Sample data
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "mango"];
const ages = [12, 18, 25, 30];
const scores = [85, 90, 78];

// forEach() – log each fruit
console.log("forEach:");
fruits.forEach((fruit, index) => {
  console.log(`${index + 1}: ${fruit}`);
});

// map() – square of each number
const squared = numbers.map(num => num * num);
console.log("\nmap (squared numbers):", squared);

// filter() – numbers greater than 2
const filtered = numbers.filter(num => num > 2);
console.log("filter (numbers > 2):", filtered);

// reduce() – sum of all numbers
const total = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("reduce (sum):", total);

// some() – check if any age is below 18
const hasMinor = ages.some(age => age < 18);
console.log("some (any minor):", hasMinor);

// every() – check if all scores are >= 50
const allPassed = scores.every(score => score >= 50);
console.log("every (all passed):", allPassed);
