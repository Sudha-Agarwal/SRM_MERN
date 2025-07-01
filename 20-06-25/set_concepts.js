// 1 Create a Set
const fruits = new Set();
fruits.add("apple");
fruits.add("banana");
fruits.add("orange");
fruits.add("apple"); // Duplicate - ignored

console.log("Fruits Set:", fruits); // Set(3) { 'apple', 'banana', 'orange' }


// 2️ Check if a value exists
console.log("Has banana?", fruits.has("banana")); // true
console.log("Has mango?", fruits.has("mango"));   // false


// 3️ Delete an item
fruits.delete("banana");
console.log("After deleting banana:", fruits); // Set(2) { 'apple', 'orange' }


// 4️ Set size
console.log("Size of set:", fruits.size); // 2


// 5️ Iterating a Set
for (let fruit of fruits) {
  console.log("Fruit:", fruit);
}


// 6️ Clear the Set
fruits.clear();
console.log("After clearing:", fruits); // Set(0) {}


// 7️ Remove duplicates from an array
const nums = [1, 2, 3, 2, 4, 3, 5];
const uniqueNums = [...new Set(nums)];
console.log("Unique numbers:", uniqueNums); // [1, 2, 3, 4, 5]


// 8️ Convert Set to Array
const lettersSet = new Set(["a", "b", "c"]);
const lettersArray = Array.from(lettersSet);
console.log("Array from Set:", lettersArray); // ['a', 'b', 'c']


// 9️ Convert Array to Set
const arrayWithDuplicates = ["x", "y", "x", "z"];
const uniqueSet = new Set(arrayWithDuplicates);
console.log("Set from array:", uniqueSet); // Set(3) { 'x', 'y', 'z' }


// 10 Set with Objects (each object is unique by reference)
const obj1 = { id: 1 };
const obj2 = { id: 1 };

const objSet = new Set();
objSet.add(obj1);
objSet.add(obj2); // Different reference, so it's added

console.log("Set of objects:", objSet); // Set(2) { {id: 1}, {id: 1} }


// 11 forEach() with Set
const colors = new Set(["red", "green", "blue"]);
colors.forEach((value) => console.log("Color:", value));


// 1️2️ Set Union, Intersection, Difference (using arrays + Set)
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

// Union
const union = new Set([...setA, ...setB]);
console.log("Union:", union); // Set(4) { 1, 2, 3, 4 }

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log("Intersection:", intersection); // Set(2) { 2, 3 }

// Difference (A - B)
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log("Difference A - B:", difference); // Set(1) { 1 }
