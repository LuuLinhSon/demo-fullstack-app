require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@demo-fullstack-app.qf3jv.mongodb.net/demoFullStackApp?retryWrites=true&w=majority`
    );

    console.log("MongoDB is connected");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello Word!"));
app.use("/api/auth", authRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started in port ${5000}`));
