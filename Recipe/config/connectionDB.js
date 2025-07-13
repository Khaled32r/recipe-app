const mongoose = require('mongoose');
const connectDB = async()=>{
await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin"
})
.then(()=> console.log("MongoDB connected successfully"))


}

module.exports = connectDB;
