import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('mongoDB connected successfully');
        })
        connection.on('error', (err)=>{
            console.log("mongodb connection err." +err);
            console.log("make sure mongodb running");
            process.exit();
            
            
        })

    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
        
    }
} 
