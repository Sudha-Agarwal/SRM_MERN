//primitive
/*this is multi
line comment*/

var x = 10;
var str='string';
var boolean_var = true;
var y; //undefined

y = null;
console.log(typeof(y))

//non primitive data type
//1.Object
//In JS there are 3 ways to create objects:
//1.By Object Literal

emp = {
    id:001,
    name:'abc',
    sal:10000
}

emp.name = "abc1";
console.log(emp.name);

//2. By creating instance of Object directly
var emp1 = new Object();
emp1.id=001;
emp1.name='abc';
emp1.sal=10000;

var emp21 = new Object();
emp21.id=001;
emp21.name='abc';
emp21.sal=10000;
emp21.dept='IT';

//constructor functions
function Employee(id,name,sal){
    this.id = id;
    this.name = name;
    this.sal = sal;    
   
}

var emp2 = new Employee(001,'abc',10000)
var emp3 = new Employee(002,'abc2',20000)

console.log(emp2.name + " " + emp3.name);

//arrays

var numbers = [1,2,3,4,5,6];
console.log(numbers[3]);

console.log(typeof(numbers));

/*for(var i=0;i<numbers.length;i++){
    console.log(numbers[i]);
}*/

/*for(var i of numbers){
    console.log(i);
} */

//array of objects //JSON
var users = [
    {id:1,name:"abc"},
    {id:2,name:"abc2"},
    {id:3,name:"abc3",address:["gfhfdg"]}
]
for(i of users){
    console.log(i.id)
}