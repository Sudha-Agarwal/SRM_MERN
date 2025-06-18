//1.var is hoisted but initialized as undefined

console.log(varExample); //undefined
var varExample = "I am a var";

//2. let and const are hoisted but not initialized
//console.log(letExample);
let letExample = "I am a let variable";

//3.Function declarations are hoisted
hoistedFunction();

function hoistedFunction(){
    console.log("i am a hoisted function")
}

//4. Function expressions are not hoisted
//notHoistedFunc();
const notHoistedFunc = function(){
    console.log("i am not a hoisted function expression")
}

//arrowFunc();
const arrowFunc = ()=>{
    console.log("i am not a hoisted arrow function")
}

//6.classes are hoisted but not initialized
const obj = new MyClass();

class MyClass{

}