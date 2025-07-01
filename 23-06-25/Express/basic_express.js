const express = require('express');//import express module into our project

const app = express();//creates an instance of express application
//we use this app object to define routes and control the server
const PORT = 3000;

//Route(API)
app.get('/',(req,res)=>{
    res.send("Hello from express")
})//when someone goes to http://localhost:3000/

app.get('/data',(req,res)=>{
    res.send({fname:'Sudha',lname:'Agarwal'})
});//when someone goes to http://localhost:3000/data

//Start server
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})

