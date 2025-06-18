/*var x = 10;

var num1 = 10;
var num2 = 20;

function sum(num1, num2){
    num1();
    //var result = num1 + num2;
    //return result;
}

function abc(){
    console.log("callback function")
}

var result = sum(abc,num2);
console.log(result);
var y = 10;
var x = function(){
    console.log("function x is called")
}

x(); */




function function2(callback){
    callback();
    return 10;
}

function2(function(){
    console.log('callback function is called')
});


//some jS statements
//code to get data from server - It will take time (blocking operation)

//next line of code
//next line of code to show data

