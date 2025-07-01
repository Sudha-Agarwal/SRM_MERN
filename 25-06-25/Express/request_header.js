const express = require('express');
const app = express();
const PORT = 3000;

app.get('/check',(req,res)=>{
    const headers = req.headers;
    console.log(headers);
    const userAgent = req.get('User-Agent');
    const auth = req.headers['authorization'];
    const contentType = req.headers['Content-Type'];
console.log(contentType);
    res.json({
        contentType:contentType,
        userAgent:userAgent,
        authorization:auth||"no Authorization header provided",
       
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });