const express = require('express')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app = express()
require('dotenv').config();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//pass:N6gxhGAANsgZbgm0

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nf4vh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const productCollection = client
            .db("warehouseManagement")
            .collection("products");
            const orderCollection = client.db("farnsOrder").collection("orders");

      //AUTH
      app.post('/login',async(req,res) => {
      const user=req.body;
      const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'1d'
      })
      res.send(accessToken)
      })


        //getting all the datas
        app.get("/products", async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
            // console.log("CONNECTED TO DB");
        });



    // getting data by id
    app.get("/products/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await productCollection.findOne(query);
        res.send(service);
      });
  
      app.delete("/products/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await productCollection.deleteOne(query);
        res.send(service);
      });
  
      app.post("/products", async (req, res) => {
        const newProduct = req.body;
        const product = await productCollection.insertOne(newProduct);
        res.send(product);
      });
  
      app.get("/farnsOrder", async (req, res) => {
        const email = req.query.email;
        const query = { email: email };
        const cursor = await orderCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      });
  
      app.post("/farnsOrder", async (req, res) => {
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(result);
      });




    }
    finally {

    }
}
run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('running server side')
})
app.listen(port, () => {
    console.log('listening on port', port);
})