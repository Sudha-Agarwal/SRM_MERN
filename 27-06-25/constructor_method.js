class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  describe() {
    console.log(`"${this.title}" by ${this.author}`);
  }
}

const book = new Book("The Alchemist", "Paulo Coelho");
book.describe(); // "The Alchemist" by Paulo Coelho
