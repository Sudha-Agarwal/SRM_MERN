function multiply(a, b) {
  return a * b;
}

console.log("Multiply 4 and 5:", multiply(4, 5)); // 20

// Default parameter
function greet(name = "Guest") {
  return "Hello, " + name;
}

console.log(greet());           // Hello, Guest
console.log(greet("Sita"));     // Hello, Sita
