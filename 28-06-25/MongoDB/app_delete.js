const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const dbName = "SRM";
const collectionName = "users";

async function run(){
    try{
        await client.connect();
        console.log("Connected");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        //delete
        const deleteOneResult = await collection.deleteOne({name:'sudha'});
         console.log("Deleted One:", deleteOneResult.deletedCount);

         //delete many documents
         const deleteManyRes = await collection.deleteMany({age: { $gt:20}});
          console.log("Deleted Many:", deleteManyRes.deletedCount);


    }
   catch(error){
        console.log(error)
    }
    finally{
        await client.close();
    }
}

run();