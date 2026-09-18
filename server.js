import express from "express";
import drivers from "./data/driver.js";
import rides from "./data/rides.js";

const app = express();

// middleware

const PORT = 3000;

app.use(express.json());

// home route
app.get("/",(req,res)=>{
    res.send("This is ride booking site backend");
});

app.get("/driver",(req,res)=>{
    
});

app.listen(PORT,()=>{
     console.log(`Server running on http://localhost:${PORT}`);
});