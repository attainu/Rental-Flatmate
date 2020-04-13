const express = require("express");
const mongoose = require("mongoose")
mongoose
    .connect(
        "mongodb://localhost:27017/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(function () {
        console.log("Mongo db compass connected")
    }).catch(function (err) {
        console.log(err.message)
    })
require("dotenv").config()
require("./utils/cloudinary")
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const propertyRoutes = require("./Routes/propertyRoutes");
const userRutes = require("./Routes/userRoutes");
const app = express();
app.use(express.json());
app.use(express.static("uploads"))
app.use(express.urlencoded({
    extended: true
}));
app.use(
    cors({
        origin: "http://127.0.0.1:1234",
        allowedHeaders: ["Content-Type"],
        credentials: true
    })
);
app.get("/", (req, res) => {
    res.send("hello");
});
app.use(propertyRoutes);
app.use(userRutes);

module.exports = app