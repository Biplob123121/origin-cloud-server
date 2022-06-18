const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a1gcb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const userCollection = client.db('origin-cloud-technologies').collection('users');

        app.post('/user', async (req, res) => {
            const newUser= req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
          });

          app.get('/user/:email', async (req, res) => {
            const mail = req.params.email;
          const query = ({ email : mail });
          const user = await userCollection.find(query).toArray();
          res.send(user);
          });

    }
    finally {

    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello From Origin Cloud Technologies!')
});

app.listen(port, () => {
    console.log(`Origin Cloud app listening on port ${port}`)
});
