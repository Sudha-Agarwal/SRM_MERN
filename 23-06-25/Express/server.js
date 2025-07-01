const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

//sample data
const products = [
    {id:1, name:'Product1', description:"Description1", category:"Mobile"},
    {id:2, name:'Product2', description:"Description2", category:"Mobile"},
    {id:3, name:'Product3', description:"Description3", category:"Mobile"},
    {id:4, name:'Product4', description:"Description4", category:"Mobile"},
    {id:5, name:'Product5', description:"Description5", category:"Mobile"},
    {id:6, name:'Product6', description:"Description6", category:"Mobile"},
    {id:7, name:'Product7', description:"Description7", category:"Mobile"}
];

app.get('/products',(req,res) =>{
    if(products.length === 0){
        res.status(404).json({message: "no product found"})
    }
    else{
        res.status(200).json(products)
    }
});

//Route to get product by ID
app.get('/products/:id',(req,res)=>{
    const productId = parseInt(req.params.id);

    //find product by ID
    const product = products.find(element =>element.id === productId);

    if(!product){
        res.status(404).json({message: "product not found"})
    }
    else{
        res.status(200).json(product)
    }    
})

app.post('/products',(req,res)=>{
    const newProduct = req.body;
    const lastId = products.length > 0?products[products.length -1].id:0;
    const productWithId = {...newProduct,id:lastId+1};
    products.push(productWithId);
    return res.status(201).json(productWithId);

})


//Start server
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})


  
