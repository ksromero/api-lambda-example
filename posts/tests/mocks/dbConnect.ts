
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod: MongoMemoryServer

export const dbConnect = async () => {
  mongod = await MongoMemoryServer.create()
  await mongoose.connect(mongod.getUri())
}

export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}