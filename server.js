import express from "express";
import drivers from "./data/driver.js";
import rides from "./data/rides.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome! Book your ride");
});


app.get("/driver", (req, res) => {
    const { available } = req.query;

    // If no query parameter is provided
    // return all drivers
    if (available === undefined) {
        return res.json(drivers);
    }

    // Convert query string into boolean
    const isAvailable = available === "true";

    // Filter drivers
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


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});