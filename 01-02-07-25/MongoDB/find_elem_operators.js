const {MongoClient} = require('mongodb');

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const dbName = "SRM";
const collectionName = "users";

const sampleUsers = [
  { name: "Anita", age: 28, email: "anita@gmail.com" },
  { name: "Ramesh", age: 32 },
  { name: "Suresh", email: "suresh@gmail.com" },
  { name: "Priya", age: "25", email: null },
];
async function run(){
    try{
        await client.connect();
        console.log("connected")

        const db = client.db(dbName);
        const users = db.collection(collectionName);

        await users.deleteMany({});
        await users.insertMany(sampleUsers);

        //find users where email field exist
        const hasEmail = await users.find({ email: {$exists: true}}).toArray();
        //console.log(hasEmail);

        //find users where email field does not exist
        const noEmail = await users.find({ email: {$exists: false}}).toArray();
        //console.log(noEmail);

        //find users where age is of type "string"
        const ageAsStr = await users.find({ age: {$type: "string"}}).toArray();
         console.log(ageAsStr);


    }
    catch(err){
        console.log(err)

    }
}
run();