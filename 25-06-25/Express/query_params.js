const express = require('express');
const app = express();

//Route that uses query parameters
app.get('/search',(req,res)=>{
    const keyword = req.query.keyword;
    res.send(`You searched for: ${keyword}`)

})

//Route not found
app.use((req,res)=>{
    res.status(404).send("route not found")
})


app.listen(3000);