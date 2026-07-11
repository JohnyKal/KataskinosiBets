
import { connectDB } from "./db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.get("/", (_req: any, res: any) => {
  res.send("Hello World!");
});

//Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
