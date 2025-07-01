// Creating an object with properties
const student = {
  name: "Arjun",
  age: 15,
  grade: "8th",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  }
};

console.log(student.name);  // Arjun
student.greet();            // Hello, my name is Arjun
