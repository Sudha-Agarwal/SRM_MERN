// Without compare function (default string sort)
const numbers = [10, 2, 5, 1];
console.log("Original numbers:", numbers);

// Default sort (lexicographic)
const defaultSorted = [...numbers].sort(); // copying to preserve original
console.log("Sorted without compare function:", defaultSorted); // [1, 10, 2, 5]

// ✅ Best practice: Use compare function for numbers
const correctlySorted = [...numbers].sort((a, b) => a - b);
console.log("Sorted with compare function:", correctlySorted); // [1, 2, 5, 10]

// Sorting strings alphabetically
const fruits = ["banana", "apple", "orange"];
fruits.sort(); // Alphabetical order
console.log("Sorted fruits:", fruits); // ['apple', 'banana', 'orange']

// Case-insensitive sort using localeCompare
const mixedCaseFruits = ["Banana", "apple", "Orange"];
mixedCaseFruits.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
console.log("Case-insensitive sort:", mixedCaseFruits);

// includes() – Check if an item exists
const hasApple = fruits.includes("apple");
const hasGrapes = fruits.includes("grapes");
console.log("Includes 'apple':", hasApple);   // true
console.log("Includes 'grapes':", hasGrapes); // false
