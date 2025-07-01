const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/SRM';

//Define Schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: [true,'name is required']},
    age: { type: Number, reqired: true},
    email:String
},{strict:false});

//Create model
const User = mongoose.model('User',userSchema);

//connect to MongoDB
mongoose.connect(url).then(()=>{
    console.log("connect to MongoDB");
    //after connecting, perform crud operations
    main();
}).catch((error)=>console.log(error))


async function main(){
    //create a new User
    const newUser = new User({age:30,email:"sudha@gmail.com", gender:"M"});
    try{
        const res = await newUser.save();
        console.log("new user created:", res);
    }
    catch(error){
        console.log('Error:', error)
    }
    finally{
        await mongoose.disconnect();
        console.log("disconnected")
    }
}