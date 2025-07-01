// OOP: Object-Oriented Programming

// Example using a class to show the OOP idea
class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  drive() {
    console.log(`${this.brand} is driving at ${this.speed} km/h`);
  }
}

const car1 = new Car("Toyota", 120);
car1.drive(); // Toyota is driving at 120 km/h
