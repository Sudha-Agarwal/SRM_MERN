const {MongoClient} = require('mongodb');

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const dbName = "SRM";
const collectionName = "products";

const sampleProducts = [
  { name: "iPhone", price: 999, category: "electronics" },
  { name: "Samsung TV", price: 450, category: "electronics" },
  { name: "samsung Notebook", price: 20, category: "stationery" },
  { name: "Apple Watch", price: 299, category: "electronics" },
  { name: "Pen", price: 5, category: "stationery" }
];

async function run(){
    try{
        await client.connect();
        console.log("connected")

        const db = client.db(dbName);
        const products = db.collection(collectionName);

        await products.deleteMany({});
        await products.insertMany(sampleProducts);
        console.log("records inserted")

        //Find all the products names starting with A
        const reqExQuery = await products.find({name:{ $regex: /^A/,$options:"i"}}).toArray();
        //console.log(reqExQuery);

        //$text
        await products.createIndex({name: "text", category:"text"});

        const textQuery = await products.find( {$text: { $search: "Samsung"}}).toArray();
        console.log(textQuery);


        
    }
    catch(err){

    }
}
run();