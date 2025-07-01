const person = {
    fullName:function(city, country){
        return this.firstName + " " + this.lastName + " "+ city + " "+country;
    }
}

const person1 = {
    firstName:"Sudha",
    lastName:"Agarwal"
}

const person2 = {
    firstName:"Sudha1",
    lastName:"Agarwal1"
}

//person1.fullName();
console.log(person.fullName.call(person1,'Delhi','India'));
console.log(person.fullName.call(person2));

console.log(person.fullName.apply(person1,['Delhi','India']))
//call, apply,bind


console.log(Math.max([2,3,4])); //return 4
var arr = [2,3,4];
console.log(Math.max.apply(null,[1,2,3]));
console.log(Math.max(...arr))
