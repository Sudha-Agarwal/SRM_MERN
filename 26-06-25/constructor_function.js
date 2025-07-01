// Constructor function to create multiple similar objects
function Student(name, age, grade) {
  this.name = name;
  this.age = age;
  this.grade = grade;
  this.greet = function () {
    console.log("Hi, I'm " + this.name);
  };
}

const s1 = new Student("Meera", 14, "9th");
const s2 = new Student("Ravi", 13, "8th");

s1.greet(); // Hi, I'm Meera
s2.greet(); // Hi, I'm Ravi
