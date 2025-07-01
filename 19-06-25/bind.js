const person = {
    firstName:"ABC",
    lastName:"XYZ",
    fullName:function(){
        return `${this.firstName} ${this.lastName}`
    }
}

const member = {
    firstName:"Sudha",
    lastName:"Agarwal"
}

let fullNameFunc = person.fullName.bind(member);

console.log(fullNameFunc());
/*
//ES5
var obj = {
    id:1,
    counter:function(){
        console.log(this.id);
        setTimeout(function(){
            console.log(this.id)
        }.bind(this),1000)
        console.log(this.id)
    }
}
obj.counter();
*/
class Counter{
    constructor(){
        this.count = 0;
    }
    increment(){
        setTimeout(function(){
            this.count++
            console.log(this.count)
        }.bind(this),1000)
    }
}

const C = new Counter();
C.increment();

//arrow functions
class Counter1{
    constructor(){
        this.count = 0;
    }
    increment(){
        setTimeout(()=>{
            this.count++
            console.log(this.count)
        },1000)
    }
}
const C1 = new Counter1();
C1.increment();