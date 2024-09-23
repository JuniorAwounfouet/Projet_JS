import express from "express"
import cors from "cors";
import { MongoClient } from 'mongodb';

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

// Connection à MongoDB

const uri = "mongodb://localhost:27017";

async function connectToMongo(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    let db = client.db(dbName)
    let collection = await db.collection(collectionName);
    return collection
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

// 1er End Point

app.get('/', (req,res) =>{
    return res.send("Bienvenue")
})

//  2e endpoint : pour récupérer les données de la collection

export async function getUsers() {
    const collection = await connectToMongo("data", "user");
    return await collection.find({}).toArray();
}

app.get('/getUser', (req,res) =>{

    connectToMongo("data", "user")
        .then(collection => {
            return collection.find({}).toArray()
        })
        .then(users => {
            res.json(users)
        })

})

// 3e endpoint : récupère les informations du formulaire et l'enregistre dans ma collection

app.post('/api/form', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    console.log(`Nom : ${name}, Email : ${email}, Message : ${message}`);

    connectToMongo("data", "user")
        .then(collection => {
            return collection.insertOne({ "name": name, "email": email, "message": message });
        })
        .then(() => {
            res.json({ message: 'Formulaire reçu avec succès' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Une erreur est survenue lors de la soumission du formulaire' });
        });
});

  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
