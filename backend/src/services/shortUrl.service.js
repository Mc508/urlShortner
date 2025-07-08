import { saveShortUrl } from "../dao/shortUrl.js";
import { shortUrl } from "../model/shortUrl.model.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlServiceWithoutUser = async (url) => {
  if (!url) {
    throw new Error("Url is required");
  }
  const short = generateNanoId(7);
  await saveShortUrl(url, short);
  return short;
};

export const createShortUrlServiceWithUser = async (url, userId) => {
  if (!url) {
    throw new Error("Url is required");
  }
  const short = generateNanoId(7);
  await saveShortUrl(url, short, userId);
  return short;
};
