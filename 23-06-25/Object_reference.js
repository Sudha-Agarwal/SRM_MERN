// Object references point to the same memory
const original = { name: "Alice" };
const copy = original;

copy.name = "Bob";

console.log("Original:", original.name); // Bob
console.log("Copy:", copy.name);         // Bob
