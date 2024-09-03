const express = require("express");
const connectionDb = require("./connectionDb");
require("dotenv").config();

const userRouter = require("./routes/user");
const app = express();
connectionDb();
app.use(express.json());
app.use('/user', userRouter);
app.listen(process.env.PORT ?? 5000 ,() => {
    console.log(`Port is listening on ${process.env.PORT}`);
})
