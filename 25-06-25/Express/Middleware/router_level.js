const express = require('express');
const router = express.Router();
const app = express();

//Router level middleware
router.use((req,res,next)=>{
    console.log('Time', Date.now());
    next();
})

router.use('/user/:id',(req,res,next)=>{
    console.log('Request Type:', req.method);
    next();
})

router.get('/user',(req,res)=>{
    res.send("Get User")
})

app.use('/api',router);
app.listen(3000);