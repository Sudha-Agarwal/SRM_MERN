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

        //insertOne
        const insertOneResult = await collection.insertOne({
            name:"sudha",age:30,email:'sudha@gmail.com'
        });
        console.log("inserted", insertOneResult.insertedId);

        //insert One - with custom id
        const customId = new ObjectId();
        const insertWithCustomId = await collection.insertOne({
            _id:customId, name:"abc"
        }) ;

        const insertmanyRes = await collection.insertMany([
            {_id:2,name:"xyz", age:20},
            {name:"xyz1", age:21},
            {name:"xyz2", age:22},

        ]);
        console.log("inserted Many", insertmanyRes.insertedCount);

        

    }
    catch(error){
        console.log(error)
    }
    finally{
        await client.close();
    }
}

run();