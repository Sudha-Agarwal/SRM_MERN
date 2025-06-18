function getData(callback){
   setTimeout(function(){
    var response = [{data:"data from server"}]
    callback(response);
   },1000) //simulating server delay
   
}
function displayData(response){
    console.log(response[0].data);
}

getData(displayData); //one way
//second way
getData(function(response){
    console.log(response[0].data);
})

getData(response =>console.log(response[0].data));


//third way
getData(response => console.log(response[0].data));



/*function function1(callback,num){
    callback(num);

}

function function2(num1){
    console.log(num1);
}

function1(function2,10)*/
