import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlServiceWithoutUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlServiceWithoutUser(url);
  if (!shortUrl) throw new Error("Short URL not found");
  res.send(process.env.APP_URL + shortUrl);
});
export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.fullUrl);
});
