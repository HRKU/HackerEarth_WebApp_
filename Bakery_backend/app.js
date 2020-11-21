const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

let port = process.env.PORT || 3100;
mongoose.connect('mongodb://hrku_123:hrku_123@merncluster-shard-00-00.u08je.mongodb.net:27017,merncluster-shard-00-01.u08je.mongodb.net:27017,merncluster-shard-00-02.u08je.mongodb.net:27017/Bakery_Backend?ssl=true&replicaSet=atlas-4476ih-shard-0&authSource=admin&retryWrites=true&w=majority',
 {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=> {
    console.log("DataBase CONNECTED")
})
// mongoose
  // .connect(
  //   "mongodb+srv://hrku_123:hrku_123@merncluster.u08je.mongodb.net/Bakery_Backend?retryWrites=true&w=majority",
  //   {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //   }
  // )
  // .then(() => {
  //   console.log("MongoDB Atlas CONNECTED . . . . . . . . . . .");
  // });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
const userRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
//My Routes

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(port, () =>
  console.log(`Bakery app is listening at http://localhost:${port}`)
);
