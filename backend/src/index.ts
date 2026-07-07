import express from "express";
import { connectDB } from "./db.js";
const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

app.get("/", (_req: any, res: any) => {
  res.send("Hello World!");
});

//Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
