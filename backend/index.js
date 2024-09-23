import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js"
import GenerateImageRouter from "./routes/GenerateImage.js"


dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//error handler

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//mongo connetion

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => {
      console.error("Failed to connect to mongoDB");
      console.error(err);
    });
};

connectDatabase();


app.use("/api/post", PostRouter)
app.use("/api/generateImage", GenerateImageRouter)

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
