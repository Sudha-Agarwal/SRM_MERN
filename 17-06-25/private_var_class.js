class BankAccount {
    #balance = 0;
  
    deposit(amount) {
      if (amount > 0) this.#balance += amount;
    }
  
    get balance() {
      return this.#balance;
    } 
  }
  
  const acc = new BankAccount();
  acc.deposit(500);
  console.log(acc.balance); 
  //acc.#balance = 1000000; //not allowed