import { shortUrl } from "../model/shortUrl.model.js";

export const saveShortUrl = async (long, short, userId) => {
  const newUrl = new shortUrl({
    fullUrl: long,
    shortUrl: short,
  });
  if (userId) {
    newUrl.userId = userId;
  }
  newUrl.save();
};

export const getShortUrl = async (short) => {
  return await shortUrl.findOneAndUpdate(
    { shortUrl: short },
    { $inc: { clicks: 1 } }
  );
};
