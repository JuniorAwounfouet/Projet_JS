import { MongoClient } from 'mongodb';
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

export function findAllTasks(){
  return connectToMongo("data", "user").then(collection => {
    return collection.find({}).toArray()
  });
}

export function newTasks() {
    return connectToMongo("data", "data").then(collection => {
      return collection.insertOne({ "_id": 3,"name": "Iphone 16 ","marque": "Apple"})
    });
}

// export function newTasks(req, res) {
  
//     let name = req.body.name;
//     let email = req.body.email;
//     let message = req.body.message;  

//   return connectToMongo("data", "user").then(collection => {
//     return collection.insertOne({ "name": name,"email": email,"message": message})       
//   });
// }

export function main() {
  connectToMongo("data", "data")
    .then(collection => {
      return findAllTasks(collection);
    })
    .then(tasks => {
      console.log("Tâches trouvées :");
      console.log(tasks);
    })
    .catch(error => {
      console.error("Une erreur est survenue :", error);
    });
}