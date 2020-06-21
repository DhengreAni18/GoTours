const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB Connected");
  });

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A Tour must have a name"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A Tour must have a price"],
  },
});

const Tour = mongoose.model("Tour", TourSchema);

const Tour1 = new Tour({
  name: "Goa Trip",
  rating: 4.9,
  price: 20000,
});

Tour1.save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
