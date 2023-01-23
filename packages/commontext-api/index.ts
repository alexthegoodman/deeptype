import express from "express";
import { startApolloServer } from "./api";
import cors from "cors";

const app = express();
const port = 3001;

// NOTE: fixes aws-sdk type error
declare global {
  export interface ReadableStream {}
}

console.info("Setup Express Routes...");

app.use(cors());

app.get("/", (req, res) => {
  res.send("API Functioning");
});

console.info("Start Server...");

app.listen(port as number, "0.0.0.0", () => {
  console.info(`Express Server ready on port ${port}`);
});

startApolloServer();
