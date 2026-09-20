import express from "express";
import drivers from "./data/driver.js";
import rides from "./data/rides.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// ============================
// Home Route
// ============================

app.get("/", (req, res) => {
    res.send("Welcome! Book your ride");
});

// ============================
// Get Drivers
// ============================

app.get("/driver", (req, res) => {
    const { available } = req.query;

    // If no query parameter is provided
    // return all drivers
    if (available === undefined) {
        return res.json(drivers);
    }

    const isAvailable = available === "true";

    const filteredDrivers = drivers.filter((driver) => {
        return driver.available === isAvailable;
    });

    res.json(filteredDrivers);
});

// ============================
// Get Driver By ID
// ============================

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

// ============================
// Create Ride
// ============================

app.post("/ride", (req, res) => {
    const {
        userName,
        pickup,
        destination,
        driverId
    } = req.body;

    // Find driver
    const driver = drivers.find((driver) => {
        return driver.id === Number(driverId);
    });

    // Driver doesn't exist
    if (!driver) {
        return res.status(404).json({
            message: "Driver not found"
        });
    }

    // Driver exists but is unavailable
    if (!driver.available) {
        return res.status(400).json({
            message: "Driver is not available"
        });
    }

    // Create ride
    const ride = {
        id: rides.length + 1,
        userName,
        pickup,
        destination,
        driverId: Number(driverId),
        status: "booked"
    };

    // Store ride
    rides.push(ride);

    // Make driver unavailable
    driver.available = false;

    res.status(201).json({
        message: "Ride created successfully",
        ride: ride
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});