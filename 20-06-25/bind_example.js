// bind_example.js

const person = {
  name: "Charlie",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

// Extracting method without binding
const greet1 = person.greet;
greet1(); // 'this' is undefined or global object

// Binding 'this' to person
const greet2 = person.greet.bind(person);
greet2(); // 'this' correctly refers to 'person'
