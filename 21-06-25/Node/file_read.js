const fs = require('fs');

fs.readFile('myFile.txt','utf-8',(err,data)=>{
    if(err){
        console.log("error reading ",err)
        return;
    }
    console.log(data)
})