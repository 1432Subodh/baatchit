// lib/connect.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable in .env.local");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined; // allow global `mongoose` across hot reloads
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: "chat_app", // optional: specify your db name
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // ensure it's cached globally
  return cached.conn;
}

export default connectDB;
