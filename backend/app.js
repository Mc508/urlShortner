import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongodb.config.js";
import shortUrlRoutes from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controllers.js";
import errorHandler from "./src/utils/errorHandler.js";
import authRoutes from "./src/routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";
import userRoutes from "./src/routes/user.route.js";
dotenv.config("./.env");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
app.use(attachUser);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", shortUrlRoutes);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is listening in port http://localhost:5000");
});
