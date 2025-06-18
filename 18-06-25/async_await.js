//without async function
function getData(){
    let mypromise = new Promise((resolve,reject)=>{
    })
}

//getData().then();


let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('promise rejected')
    },1000)
});

//with async/await
async function getAsyncData(){
    try{
        let result = await promise;
        console.log(result);
        console.log("synchronous code");
        console.log("synchronous code");
    }
    catch(error){
        console.log(`Error message: ${error}`)

    }    
}
getAsyncData();
console.log("synchronous code 2")