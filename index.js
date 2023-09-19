const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Char = require("./routes/Char.js");
const connectDB = require("./config/db.js");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors")

//databse config
connectDB();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())

// app.use(express.json())

app.use("/",Char);

app.get("/",(req,res)=>{
    res.status(200).json({
        msg: "Hello From SignBase Server..."
    })
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`app is listning on port ${port}`);
})