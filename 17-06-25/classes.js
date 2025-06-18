//Before classes, we used constructor functions to do OOP in Javascript

/*function Pen(name,color,price){
    this.name = name;
    this.color=color;
    this.price=price;
}*/


class Pen {
    constructor(name, color, price) {
        this.name = name;
        this.color = color;
        this.price = price;
    }

    showPrice(){
        console.log(`Price of ${this.name} is ${this.price}`)
    }
}
const pen1 = new Pen("marker", "blue",100);
console.log(pen1.name);
pen1.showPrice();

//Inheritance
class Person{
    //#fName; //to make private variable

    constructor(fName, lName){
        this._fName = fName;
        this._lName = lName;
    }

    //getter 
    get fName(){
        return this._fName;
    }
    get lName(){
        return this._lName;
    }

    //setters
    set fName(newfName){
        this._fName = newfName;
    }
    set lName(newlName){
        this._lName = newlName;
    }

    showDetails(){
        console.log(`Student Details:
            First Name: ${this.fName} Last Name: ${this.lName}
        `)
    }

    //static method
    static FullName(){
       console.log("static methods")
    }
}

class Student extends Person{
    constructor(fName,lName,course){
        super(fName,lName);//calling parent class constructor
        this._course = course
    }
    get course(){
        return this._course;
    }

    showDetails(){
        super.showDetails(); //calling parent class function
        console.log(`Course: ${this.course}`)
    }
}

var student1 = new Student("Sudha","Agarwal",'IT');
student1.showDetails();
console.log(student1._fName);
student1._fName = "Sudhaaaaaaaa";

console.log(student1.fName);
Student.FullName();