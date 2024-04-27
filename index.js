const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://NaturealCraft:5MWQGg8rpkq4yWba@cluster0.zqymdgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const craftItemCollection = client.db("CraftItems").collection("addedCraftItems");

        app.get('/craftItems', async (req, res) => {
            const result = await craftItemCollection.find().toArray();
            res.send(result)
        })

        app.post('/craftItems', async (req, res) => {
            const craftDetails = req.body;
            console.log(craftDetails)
            const result = await craftItemCollection.insertOne(craftDetails)
            res.send(result);
        })

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})