const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = "SRM";
const collectionName = "demo";

async function run() {
    try {
        await client.connect();
          console.log("Connected");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Clean collection for demo
        await collection.deleteMany({});
        await collection.insertOne({
            name: "Test",
            age: 30,
            salary: 1000,
            skills: ["JS", "Node"],
            logins: [1, 2, 3, 4],
            metadata: { bit: 5 },
            createdAt: new Date("2023-01-01"),
            details: "developer"
        });

        //$mul - multiply a field
        await collection.updateOne({},{ $mul: { salary: 1.1}})

        //$min - set if smaller
        await collection.updateOne({},{ $min: { age: 31}});

        // $max - Set if greater
        await collection.updateOne({}, { $max: { salary: 2000 } });

        //$rename - rename a field
        await collection.updateOne({},{ $rename: { details: "details1"}});

        //$addToSet - add if not in array
        await collection.updateOne({}, { $addToSet: {skills: 'MongoDB'}})

        //$push - add to array end
        await collection.updateOne({}, { $push: { logins: 5}})

        //$pull
        await collection.updateOne({},{ $pull: {logins: {$gte: 3}}});

        //$pop
        await collection.updateOne({}, { $pop: { logins: 1 } });



    }
    catch (err) {
        console.error("Error during update operations:", err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

run();
