import express, { Request, Response } from "express";
import { json } from "body-parser";
import cors from "cors";
import { connect } from "mongoose";

import config from "./config";
import auth from "./middleware/auth";
import AuthRouter from "./routes/auth";
import EmployeeRouter from "./routes/employee";

const app = express();
const { MONGO_URI, MONGO_DB_NAME, PORT } = config;

app.use(json());
app.use(cors());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

// Connect to Mongo
connect(db) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api/auth", AuthRouter);
app.use("/api/employees", auth, EmployeeRouter);  

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});