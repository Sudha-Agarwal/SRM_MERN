const fs = require('fs');

fs.open("myFile.txt", 'w',(err,fd)=>{
    if(err){
        console.log(err);
        return
    }

    const data = "Hello World";

    fs.write(fd,data,(err,bytewriiten)=>{
        if(err){
            console.log("error writing");
            return
        }
    })

    fs.close(fd,(err)=>{
        console.log(err)
    })


})