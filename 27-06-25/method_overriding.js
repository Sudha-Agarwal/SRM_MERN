class Animal {
  speak() {
    console.log("Some generic sound...");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow!");
  }
}

const kitty = new Cat();
kitty.speak(); // Meow!
