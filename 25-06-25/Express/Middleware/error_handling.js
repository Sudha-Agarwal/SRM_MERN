const express = require('express');
const cookieParser = requires('cookie-parser')
const app = express();

app.use(cookieParser())//third party middleware


app.get('/', (req,res)=>{
    throw new Error('BROKEN');

})
app.get('/user', (req,res,next)=>{
    console.log("get method called");
    next();
});

app.use((req,res,next)=>{
    console.log("logging middleware");
    next();
})


//Error handling middleware
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send("something broke")

})

app.listen(3000);