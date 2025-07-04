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
        { name: "Aarav", age: 25, active: true, city: "Delhi" },
        { name: "Priya", age: 30, active: false, city: "Mumbai" },
        { name: "Kiran", age: 28, active: true, city: "Delhi" },
        { name: "Neha", age: 35, active: false, city: "Pune" },
        { name: "Ravi", age: 22, active: true, city: "Kolkata" }
    ]);

    //OR
    const res = await users.find({
        $or: [
            {city: 'Mumbai'},
            {age: 25}
        ]
    }).toArray();
        console.log(res);



    }
    catch(err){

    }
}
run();