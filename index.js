

const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const cors = require("cors")

// middleware
app.use(cors())
app.use(express.json())


require('dotenv').config()


// MongoDB DataBase Connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://abdullahalnomandev1:rYNtWfKxDmJzASwd@edubd.4sab9al.mongodb.net/?retryWrites=true&w=majority&appName=EduBD";

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


    // To Sent data From Clint Site

    const database = client.db("coursesDB");
    const courseCollection = database.collection("courses")

    app.post('/courses',async(req,res)=>{
      const course = req.body;
      console.log(course) 
      const result = await courseCollection.insertOne(course)
      res.send(result);
    })

    // Read Data from Database

    app.get('/sessions',async(req, res) =>{
      const session = courseCollection.find()
      const result = await session.toArray()
      res.send(result)
    })




    // To Sent data From Clint Site

    const materialsDB = client.db("MaterialsDB");
    const materialsCollection = materialsDB.collection("materials")

    app.post('/materials',async(req,res)=>{
      const material = req.body;
      console.log(material) 
      const result = await materialsCollection.insertOne(material)
      res.send(result);
    })

    // Read Data from Database

    app.get('/studyMaterial',async(req, res) =>{
      const sm = materialsCollection.find()
      const result = await sm.toArray()
      res.send(result)
    })



    // To Sent data From Clint Site

    const notesDB = client.db("notesDB");
    const notesCollection = notesDB.collection("notes")

    app.post('/notes',async(req,res)=>{
      const note = req.body;
      console.log(note) 
      const result = await notesCollection.insertOne(note)
      res.send(result);
    })

    // Read Data from Database

    app.get('/nots',async(req, res) =>{
      const note = notesCollection.find()
      const result = await note.toArray()
      res.send(result)
    })




    // Edit or Update Operation

    app.get('/nots/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await notesCollection.findOne(query)
      res.send(result)
    })

    app.put('/updateNots/:id',async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updateNots = req.body;
      const note = {
        $set: {
      email: updateNots.email,
      title: updateNots.title,
      text:updateNots.text,
        }
      }

      const result = await notesCollection.updateOne(filter,note,options)
      res.send(result)
    })











    // Delete operation
    app.delete('/nots/:id', async(req,res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {_id: new ObjectId(id)}
      const result = await notesCollection.deleteOne(query)
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res) => {
    res.send('server in running')
  })
  
  app.listen(port, () => {
    console.log(`Server in running on port ${port}`)
  })