require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const OneToOneRouter= require("./routers/one-to-one")
const OneToManyRouter= require("./routers/one-to-many")

const mongoString = process.env.DATABASE_URL
mongoose.connect(
    'mongodb+srv://Relationship:Relationship@cluster0.hhvwgfd.mongodb.net/relationshipy',
  { useNewUrlParser: true, useUnifiedTopology: true },
)
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected')
})
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use(cors({ origin: '*', credentials: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use('', ProductsRouter);
app.use('',OneToOneRouter)
app.use('',OneToManyRouter)
