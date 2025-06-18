// concat() – Merge arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const merged = arr1.concat(arr2);
console.log("concat():", merged); // [1, 2, 3, 4, 5]

// slice() – Extract part of array
const sliced = merged.slice(1, 4);
console.log("slice(1, 4):", sliced); // [2, 3, 4]

// splice() – Remove and/or add elements
const colors = ["red", "green", "blue"];
colors.splice(1, 1, "yellow", "orange"); // remove 1 at index 1 and add 2
console.log("splice():", colors); // ['red', 'yellow', 'orange', 'blue']

// includes() – Check if value exists
console.log("includes('blue'):", colors.includes("blue")); // true
console.log("includes('purple'):", colors.includes("purple")); // false

// indexOf() – Find index of item
console.log("indexOf('yellow'):", colors.indexOf("yellow")); // 1
console.log("indexOf('pink'):", colors.indexOf("pink")); // -1
