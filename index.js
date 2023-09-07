const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Char = require("./routes/Char.js");
const connectDB = require("./config/db.js");
const bodyparser = require("body-parser");
const app = express();

// cors are remaining to install

//databse config
connectDB();

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(express.json())

app.use("/",Char);

app.get("/",(req,res)=>{
    console.log("hello from server");
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`app is listning on port ${port}`);
})