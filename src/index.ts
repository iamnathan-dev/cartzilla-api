import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { db } from "./models";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("tiny"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "404 route not found" });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
  console.log(`Server running on port ${port}...`);
  console.log(`Server running in ${process.env.NODE_ENV?.toUpperCase()} mode.`);

  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
