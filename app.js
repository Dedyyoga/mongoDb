const express = require("express");
const Mongoose = require("mongoose");
const app = express();
const port = 3000;
//untuk API kedepannya
app.use(express.json());
//                   mongodb/localhostmongo/namadatabases
Mongoose.connect("mongodb://localhost:27017/belajar")
  .then((res) => console.log("connect databases"))
  .catch((err) => console.log(err));

//setelah buat schema
const dataSchema = new Mongoose.Schema({
  nama: {
    type: String,
    //required wajib
    required: true,
  },
  usia: {
    type: Number,
    required: true,
  },
});

//setelah itu kita buat model
const Data = Mongoose.model("Data", dataSchema);

app.get("/", async (req, res) => {
  try {
    const hasil = await Data.find();

    res.status(200).send(hasil);
  } catch (error) {
    console.log(error);
  }
});

app.post("/", async (req, res) => {
  try {
    let { nama, usia } = req.body;
    const hasil = await Data.create({ nama, usia });
    res.status(201).send(hasil);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`server running port ${port}`));
