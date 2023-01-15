import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

//TODO: upload environment to vercel and use it as process.env.MONGODB_URL
const MONGODB_URL =
  "mongodb+srv://open_user:open_user_1234@clustertest.l6njp.mongodb.net/test";

const mongooConnection = {
  status: 0,
};

export const connect = async () => {
  if (mongooConnection.status !== 0) {
    console.log("we were already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.status = mongoose.connections[0].readyState;

    if (mongooConnection.status === 1) {
      console.log("Using existing database connection");
      return;
    }

    await disconnect();
  }

  mongooConnection.status = 2;
  console.log("Connecting to database: ", MONGODB_URL);

  await mongoose.connect(MONGODB_URL || "");
  mongooConnection.status = 1;
  console.log("Connected to database: ", MONGODB_URL);
};

export const disconnect = async () => {
  if (mongooConnection.status === 0) return;

  // mongooConnection.status = 3;
  // console.log("Disconnecting from database", MONGODB_URL);

  // await mongoose.disconnect();
  // mongooConnection.status = 0;
  // console.log("Disconnected from database", MONGODB_URL);
};
