const {MongoClient} = require('mongodb');

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const dbName = "SRM";
const collectionName = "users";

async function run(){
    try{
        await client.connect();
        console.log("connected")

        const db = client.db(dbName);
        const users = db.collection(collectionName);

        await users.deleteMany({});

       await users.insertMany([
            { name: "Aarav", age: 25, city: "Delhi" },
            { name: "Priya", age: 30, city: "Mumbai" },
            { name: "Raj", age: 22, city: "Delhi" },
            { name: "Neha", age: 35, city: "Pune" },
            { name: "Kiran", age: 28, city: "Delhi" }
        ]);

        //Equality Match
        const res = await users.find({ city: {$eq: 'Delhi'}}).toArray();
        //console.log(res);

        //Not equal
        const res1 = await users.find({ age: { $ne: 30}}).toArray();
        //console.log(res1);

        //greater than
        const res2 = await users.find({ age: { $gt: 30}}).toArray();
        //console.log(res2);

        //$in
        const res3 = await users.find({city: {$in: ["Delhi", "Pune"]}}).toArray();
        //console.log(res3);
        //$nin
        const res4 = await users.find({age: {$nin: [22,25]}}).toArray();
        console.log(res4);
    }
    catch(err){
        console.log(err)

    }
}

run();