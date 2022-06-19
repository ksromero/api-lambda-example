import mongoose from 'mongoose'

let isConnected: any

export default function connectDb(uri: string) {
  return new Promise((resolve, reject) => {
    if (isConnected) {
      console.log('Connected to current connection!')
      return resolve(isConnected)
    }

    return mongoose
      .connect(uri)
      .then((db) => {
        isConnected = db.connections[0].readyState
        console.log('New connection established!')
        resolve(isConnected)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}
