const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const productRoutes = require('./routes/productsRoute')

app.use(bodyParser.json());

//Use product routes
app.use('/products',productRoutes);
//if the request is http://localhost/3000/products

//app.use('/users',userRoutes);
//if the request is http://localhost/3000/users


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})