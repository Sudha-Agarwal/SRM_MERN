//"use strict"
//classes are first class citizens
//Assigned to a variable
const MyClass = class{
    constructor(){
        //x = 10//error as classes are by default run in strict mode
    }
    sayHi(){
        console.log("Hello World")
    }
} 

const obj = new MyClass();
obj.sayHi()

//Passed as an argument
function createInstance(ClassDef){   
   return new ClassDef
}
class Dog{
}

class Cat{
}
var obj1 = createInstance(Dog);
var obj2 = createInstance(Cat);

console.log(obj2 instanceof Cat);


//classes can be stored in Data Structure
const classes=[Dog,Cat];


//x = 10;
//console.log(x) //in strict mode not allowed

/*function sum(a,a){
    return a+a;
}
console.log(sum(2,3));
*/

