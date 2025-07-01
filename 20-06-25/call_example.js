// call_example.js

function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Alice" };

// Using call() to set 'this' and pass arguments individually
greet.call(person, "Hello", "!");
