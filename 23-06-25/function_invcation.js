// Function invocation
function welcome(name) {
  console.log("Welcome, " + name + "!");
}

welcome("Arjun");  // Direct invocation

// Invoking using call
welcome.call(null, "Ravi");

// Invoking using apply
welcome.apply(null, ["Kiran"]);

// Invoking using bind (creates a new function)
const boundWelcome = welcome.bind(null, "Meera");
boundWelcome();
