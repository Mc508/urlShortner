import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongodb.config.js";
import { shortUrl } from "./src/model/shortUrl.model.js";
import shortUrlRoutes from "./src/routes/shortUrl.route.js";

dotenv.config("./.env");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", shortUrlRoutes);

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const url = await shortUrl.findOne({ shortUrl: id });
  if (url) {
    res.redirect(url.fullUrl);
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(5000, () => {
  console.log("Server is listening in port http://localhost:5000");
});
