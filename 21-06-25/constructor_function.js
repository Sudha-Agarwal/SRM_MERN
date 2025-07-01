function Animal(type, sound) {
    this.type = type;
    this.sound = sound;    
  }
  Animal.prototype.makeSound = function(){
    return `${this.type} say ${this.sound}`
}
  const dog = new Animal("Dog", "Woof");
  const cat = new Animal("Cat", "Meow");
  
  console.log(dog.makeSound()); // Dog says Woof
  console.log(cat.makeSound()); // Cat says Meow

