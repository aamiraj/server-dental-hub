const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
require('dotenv').config()

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ghnljed.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = "dentalHub"

async function main(){
    try{
        const servicesCollection = client.db(dbName).collection("services")

        app.get('/services', async (req, res)=>{
            const services = await servicesCollection.find({}).toArray()
            res.send(services)
        })

    }finally{

    }
}

main().then().catch()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Doctor Hub is listening on port ${port}`)
})