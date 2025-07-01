//function returning function
function greeting(){
    let message = 'Hello';

    function sayHi(newMessage){
        message = newMessage;
        console.log(message)
    }
    return sayHi;    
}

let hiFunc = greeting();
//console.log(message)
hiFunc("Hello world");


//closure is used to achieve data privacy
const manageBankAccount = function(initialBal){
    let accountBal = initialBal;

    return {
        getBalance: function(){return accountBal},
        deposit: function(amount){accountBal+=amount},
        withdrwa: function(amount){ 
            if(amount>accountBal){
                return "You cannot withdraw that much"
            }
            accountBal -= amount
        }
    }
}

const accountManager = manageBankAccount(0);
console.log(accountManager.getBalance());
accountManager.deposit(1000);
console.log(accountManager.getBalance());
