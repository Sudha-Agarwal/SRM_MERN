// Abstraction & Encapsulation
class BankAccount {
  #balance = 0; // private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Alice");
account.deposit(500);
console.log(account.getBalance()); // 500

// Inheritance
class SavingsAccount extends BankAccount {
  addInterest() {
    this.deposit(50); // Adding interest
  }
}

const savings = new SavingsAccount("Bob");
savings.deposit(1000);
savings.addInterest();
console.log(savings.getBalance()); // 1050

// Polymorphism
class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

const pet = new Dog();
pet.speak(); // Dog barks
