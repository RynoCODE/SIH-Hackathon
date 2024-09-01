import mongoose from "mongoose";

type ConnectionObject = {
    isconnected?: number
}

const connection: ConnectionObject = {};

async function dbconnect(): Promise<void>{
    if (connection.isconnected) {
        console.log("Using existing connection");
        return
    }

    try{
        const db = await mongoose.connect(process.env
            .MONGODB_URI || "", {})
        connection.isconnected = db.connections[0].readyState;
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
}
export default dbconnect;