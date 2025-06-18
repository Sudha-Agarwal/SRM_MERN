const sum = (num1, num2)=> num1 + num2;

var result = sum(10,20);
console.log(result);

const sqr = num =>num*num;

const display = ()=>"hello World";

console.log(sqr(2));
console.log(display());

const function1 =callback =>callback();

function1(() =>console.log("callback called"));
function1(() =>console.log("callback called again"));