const arr1 = [1,2,3];
const arr2 = [4,5,6];

const combined = arr1.concat(arr2);

console.log(combined);

//using spread opertaor
const combined_array = [...arr1, ...arr2,7,8];
console.log(combined_array);

const user = {name:'abc', age:25, city:'Delhi'};
const newUser = {...user, age:30,country:'India'};
console.log(user)
console.log(newUser);


const users=[
    {id:1,name:'Abc1', age:25},
    {id:2,name:'Abc2', age:26},
    {id:3,name:'Abc3', age:27},

];
const updatedUsers = users.map(user=> user.id ===3?{...user,age:30}:user);

console.log(updatedUsers)