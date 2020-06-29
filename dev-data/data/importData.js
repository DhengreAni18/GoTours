const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require('../../models/tourModel');

dotenv.config({ path: "../../config.env" });
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB Connected from import Data🔥");
  });

const tours =JSON.parse (fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('Imported data from JSON successfully!!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data deleted successfully!!');
        process.exit();

    } catch (err) {
        console.log(err);
    }
}

if(process.argv[2] == '--import') {
    importData();
} else if(process.argv[2] == '--delete') {
    deleteData();
}

