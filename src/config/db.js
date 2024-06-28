const mongoose = require('mongoose');

const connectDB = async()=>{
    try{ 
        await mongoose.connect('mongodb://localhost:27017/treeplanting',{
            
            useUnifiedTopology:true,
        });
        console.log('MongoDB Connected');

    }catch(error)
    {
       console.log("Error iconnecting to database",error);
       process.exit(1);
    }
}

module.exports = connectDB;