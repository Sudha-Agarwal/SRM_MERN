const numbers = [45,4,9,16,25];

numbers.forEach(value=>console.log(value));
const updatedArray = numbers.map(num => num*2);
//numbers.forEach(value=>value*2);
console.log(numbers)

const cities = ["del", 'mum', "ban'"];
const upper = cities.map(name=>name.toUpperCase());
console.log(upper);

const number1 = [45,4,9,16,25];
number1.map(num=>num*2).reverse().forEach(num=>console.log(num));