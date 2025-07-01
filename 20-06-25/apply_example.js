// apply_example.js

function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Bob" };

// Using apply() to set 'this' and pass arguments as an array
greet.apply(person, ["Hi", "!!"]);
