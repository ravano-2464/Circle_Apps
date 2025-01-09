import express from "express";
import * as dotenv from "dotenv";
import db from "./db";
import router from "./routes";
import path from "path";
import cors from "cors";
import pg from "pg";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use(router);

app.get("/", async (req, res) => {
  res.send("This is the backend for Circle App by Ravano Akbar Widodo");
});

app.listen(PORT, async () => {
  await db.$connect();
  console.log(`Server is running on port: ${PORT}`);
});

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

module.exports = pool;