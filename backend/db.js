const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = "mongodb://shamsikaif473:SxnHC0VGLm7YH4z3@cluster0-shard-00-00.0u7ny.mongodb.net:27017,cluster0-shard-00-01.0u7ny.mongodb.net:27017,cluster0-shard-00-02.0u7ny.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-4zf5vs-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};
