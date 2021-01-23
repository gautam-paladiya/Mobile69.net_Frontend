import mongoose from 'mongoose'

const connection = {}

async function connectDb () {
  if (connection.isConnected) {
    console.log('Using existing connection')
    return
  }
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    auth: {
      authSource: process.env.MONGO_ADMIN
    },
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
  })
  console.log('DB Connected')
  connection.isConnected = db.connections[0].readyState
}

export default connectDb
