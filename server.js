import express from "express";
import drivers from "./data/driver.js";
import rides from "./data/rides.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server running on https://localhost:${PORT}`);
});