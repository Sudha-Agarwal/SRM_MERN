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
        const insertResult = await collection.insertOne({name:'Sudha2', dept:'CS'});
        console.log(`Inserted document`,insertResult.insertedId);

    }
    catch(err){
        console.log(err)
    }
    finally{
        //close the connection
        await client.close();
    }
}

console.log("synchronous code1");
main().catch(console.error);
console.log("synchronous code2");