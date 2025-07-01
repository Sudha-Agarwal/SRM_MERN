const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = "SRM";
const collectionName = "users";

async function run() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        //insert Initial data
        const insertResult = await collection.insertMany([
            { name: "Alice", age: 25, email: "alice@example.com" },
            { name: "Bob", age: 30, email: "bob@example.com" },
            { name: "Charlie", age: 28, email: "charlie@example.com" },
            { name: "Eva", city: "Nagpur" }
        ]);
        console.log("inserted", insertResult.insertedCount);

        //updateOne - set a new age for a single user
        const updateRes = await collection.updateOne(
            {name:'Alice'},{$set: {age:26}}
        );
        console.log("update One", updateRes);

        //update many - increment age of all users by 1
        const updatemanyRes = await collection.updateMany(
            {},{ $inc: {age: 1}}
        )
        console.log("update Many", updatemanyRes);

        //ReplaceOne - completely replace a document
        const replaceOneRes = await collection.replaceOne(
            { name:'Charlie' },
            {name:"charlie", age:30,city:'Delhi'}        
        )

        //Update with upsert - if not found, insert new
        const upsertRes = await collection.updateOne(
            {name:"sudha"},{$set: {city:'Mumbai1'}},{upsert:true}
        );
        console.log("Update with upsert", upsertRes);

        //remove a filed using $unset
        const unsetRes = await collection.updateOne(
            {name:'Bob'},
            { $unset: { email: ''}}
        )
         console.log("updateOne with $unset:", unsetRes);

         //add field if not exist using $setOnInsert
         const setonInsertres = await collection.updateOne(
            {name:"Eva1"},
            {
                $setOnInsert: {email:"eva@gmail.com"}
               
            },{upsert:true}
         );
          console.log("updateOne with $setOnInsert:", setonInsertres);
    } 
        
    catch (err) {
        console.error("Error during update operations:", err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

run();
