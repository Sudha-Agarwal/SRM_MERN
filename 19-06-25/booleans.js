// JavaScript Booleans example
const isAdult = true;
const hasTicket = false;

if (isAdult && !hasTicket) {
  console.log("You are an adult but do not have a ticket.");
} else if (isAdult && hasTicket) {
  console.log("You are allowed entry.");
} else {
  console.log("You are not allowed entry.");
}
