const express = require('express');
const app = express();


//Buil in middlewares
//1. express.static()
app.use(express.static('public'));

//2. express.jon()
app.use(express.json());

//3.express.urlencoded
//parses URL-encoded data from HTML Form submission
app.use(express.urlencoded({extended:true}));

//4.express.text()
//parses incoming request with plain text payload
app.use(express.text());

//5.express.raw()
//Parses the body as a raw buffer(useful for binary data)
app.use(express.raw())