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
    const { available }=req.query;
    if(available===undefined){
        return res.json(drivers);
    }
    const isAvailable=available==="true";

     const filteredDrivers = drivers.filter((driver) => {
        return driver.available === isAvailable;
    });

    res.json(filteredDrivers);
});

app.get("/driver/:id", (req, res) => {
    const id = Number(req.params.id);

    const driver = drivers.find((driver) => {
        return driver.id === id;
    });

    if (!driver) {
        return res.status(404).json({
            message: "Driver not found"
        });
    }

    res.json(driver);
});


app.listen(PORT,()=>{
     console.log(`Server running on http://localhost:${PORT}`);
});