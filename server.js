import express from "express";
import drivers from "./data/driver.js";
import rides from "./data/rides.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/drivers",(req,res)=>{
    res.json(drivers);
});

app.get("/driver/:id",(req,res)=>{
    const id=Number(req.params.id);
    const driver = drivers.find((drivers)=>{
        return driver.id === id ;
    });
    if(!driver){
        return res.status(404).json({
            message:"Driver not found";
        })
    }
    res.json(driver);
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});