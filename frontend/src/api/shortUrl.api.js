import { axiosInstance, handleAxiosError } from "../utils/axiosInstance";

export const createShortUrl = async (url, slug) => {
  try {
    const { data } = await axiosInstance.post("/api/create", {
      url,
      slug,
    });
    return data.shortUrl;
  } catch (error) {
    handleAxiosError(error);
  }
};
