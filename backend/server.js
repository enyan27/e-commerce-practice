import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests

app.get("/", (req, res) => {
    res.status(200).json({ message: "寝ても覚めても🦔😭" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});