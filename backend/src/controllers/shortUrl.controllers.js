import { getShortUrl } from "../dao/shortUrl.js";
import {
  createShortUrlServiceWithoutUser,
  createShortUrlServiceWithUser,
} from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlServiceWithUser(
      data.url,
      req.user._id,
      data.slug
    );
  } else {
    shortUrl = await createShortUrlServiceWithoutUser(data.url);
  }
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.fullUrl);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.params;
  const shortUrl = await createShortUrlServiceWithoutUser(url, slug);
  if (!shortUrl) throw new Error("Short URL not found");
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
