const express = require('express');

const app = express();

const middleware1 = (req, res, next) => {
    console.log("Middleware 1");
    next();
  };
  
  const middleware2 = (req, res, next) => {
    console.log("Middleware 2");
    next();
  };
  app.use(middleware1, middleware2);
  
app.use((req,res,next)=>{
    console.log(`Time:`,Date.now());
    next();
});

app.get('/user',(req,res)=>{
    res.send('USER')
})

app.listen(3000,()=>{

})