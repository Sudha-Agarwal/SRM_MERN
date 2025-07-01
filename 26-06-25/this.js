const person = {
  name: "Rahul",
  sayName: function () {
    console.log("My name is " + this.name);
  }
};

person.sayName(); // My name is Rahul

const anotherSayName = person.sayName;
anotherSayName(); // My name is undefined (because 'this' refers to global object in non-strict mode)
