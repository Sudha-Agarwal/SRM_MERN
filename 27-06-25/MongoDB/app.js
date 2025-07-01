const {MongoClient} = require('mongodb');

//const url = 'mongodb+srv://sudha-agarwal:cijfv8zkipjPDvYF@cluster0.6jtsgwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const url = 'mongodb://localhost:27017';
const dbName = 'SRM';

const client = new MongoClient(url);

async function main(){
    try{
        //connect to MongoDB server
        await client.connect();
        console.log('connected successfully to server');

        //Access the the database
        const db = client.db(dbName);

        //perform some operations
        const collection = db.collection('Student');
        //Insert a document
        //const insertResult = await collection.insertOne({name:'Sudha2', dept:'CS'});
        //console.log(`Inserted document`,insertResult.insertedId);

        //Find a document
        const findResult = await collection.find({age:{$gte:12}},{projection:{dept:1}}).toArray();
        console.log("Found document", findResult);

        //update a document
        //const updateResult = await collection.updateOne({name:"Sudha2"},{$set:{age:14}});

        //delete a document
        const deleteResult = await collection.deleteOne({name:"Sudha3"});
        console.log(`deleted deleted count`, deleteResult.deletedCount)

        const result = await collection.find({age:{$type:"int"}},{projection:{age:1}}).toArray();

        console.log(result)

    }
    catch(err){
        console.log(err)
    }
    finally{
        //close the connection
        await client.close();
    }
}


main().catch(console.error);
