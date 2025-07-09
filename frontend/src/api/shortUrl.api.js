import { axiosInstance, handleAxiosError } from "../utils/axiosInstance";

export const createShortUrl = async (url) => {
  try {
    const { data } = await axiosInstance.post("/api/create", {
      url,
    });
    console.log(data);
    return data.shortUrl;
  } catch (error) {
    handleAxiosError(error);
  }
};


