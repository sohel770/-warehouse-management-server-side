const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors')
const port=process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//pass:N6gxhGAANsgZbgm0

const uri = "mongodb+srv://newdata:N6gxhGAANsgZbgm0@cluster0.nf4vh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

    }
    finally{

    }
}
run().catch(console.dir)





app.get('/',(req,res) => {
    res.send('running server side')
})
app.listen(port,()=>{
    console.log('listening on port',port);
})