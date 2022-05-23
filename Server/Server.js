const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const commentsRoute = require('./Routes/comments');

app.use(express.json());
app.use(cors());

app.use(commentsRoute);

app.get("/", (req, res) => {
    res.send("Hello world");
}
);

const DB_URL = 'mongodb+srv://Kumuthu:omega123@cluster0.ehhq0.mongodb.net/influencer_hub?retryWrites=true&w=majority';

mongoose
.connect(DB_URL)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(5000, () => console.log("Server is running in port 5000"));