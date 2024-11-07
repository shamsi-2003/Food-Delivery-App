const mongoose = require("mongoose");
const mongoURI =
  "mongodb://shamsikaif473:SxnHC0VGLm7YH4z3@cluster0-shard-00-00.0u7ny.mongodb.net:27017,cluster0-shard-00-01.0u7ny.mongodb.net:27017,cluster0-shard-00-02.0u7ny.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-4zf5vs-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, res) => {
      if (err) console.log("---", err);
      else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.foodCategory = catData;
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDB;
