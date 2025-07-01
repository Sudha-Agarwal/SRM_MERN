const person = {
    greet() {
      return `Hi, I'm ${this.name}`;
    }
  };

  const student = Object.create(person); //student inherits from person
  student.name = "Sudha";

  console.log(student.greet());

  const config = {
    apiKey: "12345"
  };
Object.freeze(config);
config.apiKey = "34567" //wont change
config.newProp="test"  //wont change
console.log(config.apiKey)

const user = {name:'Sudha'}
const updates = {age:40,name1:"Sudha1"}

const merged = Object.assign({},user,updates)
console.log(merged);

const scores = {
    math: 90,
    english: 85,
    science: 92
  };

  const values = Object.values(scores);
  console.log(values);

  const keys = Object.keys(scores);
  console.log(keys)

  Object.keys(scores).forEach(key => {
    console.log(`${key} = ${scores[key]}`);
  });

  console.table(scores);
 
  scores.toString = function(){
    return `${this.english} ${this.math}`
  }

  console.log(scores.toString())