import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import answerRoutes from "./routes/answers.routes.js";
import express, { type Application } from "express";
import type {
    Request,
    Response,
    NextFunction,
} from "express";

const app: Application = express();
const allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    
      origin: (origin, callback) => {
        // allow tools like Postman
        if (!origin) return callback(null, true);
  
        // allow localhost
        if (allowedOrigins.includes(origin)) return callback(null, true);
  
        // allow ALL Vercel preview deployments
        if (origin.endsWith(".vercel.app")) return callback(null, true);
  
        return callback(new Error("Blocked by CORS"));
      }, // frontend URL
    credentials: true, // allow cookies to be sent
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});
// Simple route
app.get("/", (req, res) => {
  res.send("Server is running");
});
// THIS LINE WIRES THE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ans", answerRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

export default app;
