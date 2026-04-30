const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const calcSchema = new mongoose.Schema({
    expression: String,
    result: Number
}, { timestamps: true });

const Calc = mongoose.model("Calc", calcSchema);

// POST calculator
app.post("/calculator", async (req, res) => {
    try {
        const { expression } = req.body;

        if (!expression) {
            return res.json({ err: "No Expression Received" });
        }

        const result = Function("return " + expression)();

        const data = new Calc({ expression, result });
        await data.save();

        res.json({ result });

    } catch (error) {
        console.log(error);
        res.json({ err: "Invalid Expression" });
    }
});

// GET history
app.get("/history", async (req, res) => {
    const data = await Calc.find().sort({ createdAt: -1 });
    res.json(data);
});

if (require.main === module) {
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
}


module.exports = app;