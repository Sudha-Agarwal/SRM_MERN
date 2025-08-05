const {MongoClient} = require('mongodb');

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const dbName = "SRM";
const collectionName = "users";

const sampleUsers = [
  {
    name: "Ravi",
    projects: [
      { title: "Website", status: "completed" },
      { title: "API", status: "in progress" }
    ]
  },
  {
    name: "Neha",
    projects: [
      { title: "Mobile App", status: "completed" },
      { title: "Website", status: "in progress" }
    ]
  },
  {
    name: "Arjun",
    projects: [
      { title: "Desktop App", status: "planned" }
    ]
  }
];

async function run(){
    try{
        await client.connect();
        console.log("connected")

        const db = client.db(dbName);
        const users = db.collection(collectionName);

        await users.deleteMany({});
        await users.insertMany(sampleUsers);

        console.log("records inserted");

        //Find users who have project with status completed
        const res = await users.find({
            projects: {
                $elemMatch: {
                    title: "Website",
                    status: "completed"
                }
            }
        }).toArray();
        console.log(res);

    }
    catch(err){
        console.log(err)

    }
}
run();
