function Animal(type) {
  this.type = type;
}

// Adding method to prototype
Animal.prototype.makeSound = function () {
  console.log(this.type + " makes a sound.");
};

const dog = new Animal("Dog");
dog.makeSound(); // Dog makes a sound

// dog inherits from Animal.prototype
console.log(dog.__proto__ === Animal.prototype); // true
