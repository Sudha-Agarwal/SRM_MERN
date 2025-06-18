//Producing code
let myPromise = new Promise(function(resolve,reject1){
    let condition=true;
    let data = [{id:1, uname:'Sudha'},
                {id:2, uname:'Sudha2'}];
    if(condition){
        resolve(data);
    }
    else{
        reject1()
    }
});
console.log('after promise');
//consuming code
myPromise.then(function(data){
    console.log("promise is resolved");
    let output  = ''
   data.forEach(element => {
    console.log(`Id: ${element.id} Name:${element.uname}`);
    output += `Id: ${element.id} Name:${element.uname} <br\>`     
   });
   document.getElementById("para1").innerHTML =  output;  
})
.catch(function(){console.log("promise is rejected")});
console.log('after consuming promise');






