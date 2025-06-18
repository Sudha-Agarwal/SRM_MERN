// Initial array
let colors = ["red", "green", "blue"];
console.log("Initial array:", colors);

// push() - Add 'yellow' to the end
colors.push("yellow");
console.log("After push('yellow'):", colors);

// pop() - Remove last element
let removedPop = colors.pop();
console.log("After pop():", colors);
console.log("Removed (pop):", removedPop);

// unshift() - Add 'pink' to the start
colors.unshift("pink");
console.log("After unshift('pink'):", colors);

// shift() - Remove first element
let removedShift = colors.shift();
console.log("After shift():", colors);
console.log("Removed (shift):", removedShift);

// length - Number of elements
console.log("Length of array:", colors.length);
