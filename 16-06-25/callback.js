console.log("starting JS");

//blocking code
setTimeout(function(){
    console.log("blocking code")
},1000);

console.log("next statement");


//server data
function serverRequest(callback){
    setTimeout(function(){
        let response = "data from server";
        callback(response);
    },1000)
}

serverRequest(data=> console.log(data));