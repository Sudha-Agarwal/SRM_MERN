class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, I’m ${this.name}, and I’m ${this.age} years old.`);
  }
}

const p1 = new Person("Aarav", 12);
p1.introduce(); // Hi, I’m Aarav, and I’m 12 years old.
