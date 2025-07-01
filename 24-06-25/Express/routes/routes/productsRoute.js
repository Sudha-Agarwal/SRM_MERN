const express = require('express');
const router = express.Router();//creates a new router instance in express
//It allows to define:
//routes, middleware, parameter handlers
//all independently from the main app object
//then we mount this router on the main app using app.use();

// In-memory product data
const products = [
    { id: 1, name: 'Product1', description: "Description1", category: "Mobile" },
    { id: 2, name: 'Product2', description: "Description2", category: "Mobile" },
    { id: 3, name: 'Product3', description: "Description3", category: "Mobile" },
    { id: 4, name: 'Product4', description: "Description4", category: "Mobile" },
    { id: 5, name: 'Product5', description: "Description5", category: "Mobile" },
    { id: 6, name: 'Product6', description: "Description6", category: "Mobile" },
    { id: 7, name: 'Product7', description: "Description7", category: "Mobile" }
  ];

  //Route Handlers
  //Get all products
router.get('/getProducts',(req,res)=>{
    if (products.length === 0) {
        res.status(404).json({ message: "No product found" });
      } else {
        res.status(200).json(products);
      }
});

// GET product by ID
router.get('/getProductById/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  });

  // POST new product
router.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    const productWithId = { ...newProduct, id: lastId + 1 };
    products.push(productWithId);
    return res.status(201).json(productWithId);
  });

  //PUT update product
  router.put('/updateProductById', (req,res)=>{
    const productId = parseInt(req.body.id,10);
   
    const productToUpdate = products.find(element=> element.id===productId);
console.log(productToUpdate);

    if(!productToUpdate){
        return res.status(404).json({error: "product Not Found"})
    }   
        Object.keys(req.body).forEach((key) => {
            if (key !== "id" && productToUpdate.hasOwnProperty(key)) {
              productToUpdate[key] = req.body[key];
            }

    });
    return res.json({ message: 'Product updated successfully', product: productToUpdate });
});
  



module.exports = router;

