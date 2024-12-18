import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async () => {

  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI as string, 
      { dbName: "resource_management_system" }
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database");
  } catch (error) {
    console.log("Database connection failed: ", error);
    process.exit(1);
  }
};

export default dbConnect;
