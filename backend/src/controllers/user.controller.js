import { getAllUserUrlsDao } from "../dao/user.dao.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const getAllUserUrls = wrapAsync(async (req, res) => {
  const _id  = req.user._id;
  const urls = await getAllUserUrlsDao(_id);
  res.status(200).json({ message: "success", urls });
});
