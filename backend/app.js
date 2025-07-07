import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongodb.config.js";
import { shortUrl } from "./src/model/shorturl.model.js";

dotenv.config("./.env");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
  const { url } = req.body;
  connectDB();
  const short = nanoid(7);

  const newUrl = new shortUrl({
    fullUrl: url,
    shortUrl: short,
  });
  newUrl.save();
  console.log(url);
  res.send(nanoid(7));
});

app.listen(5000, () => {
  console.log("Server is listening in port http://localhost:5000");
});
