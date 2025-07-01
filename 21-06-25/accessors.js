const person = {
    _firstName:"Sudha",
    _lastName:"Agarwal",

    get firstName(){
        console.log("getter called")
        return `${this._firstName}`
    },

    set firstName(newName){
        console.log("setter called")
        this._firstName = newName;
    }
}

console.log(person.firstName)
person.firstName = 'Sudha1';
console.log(person.firstName)