import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { QueryClient } from "@tanstack/react-query";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState();
  const [customSlug, setCustomSlug] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   console.log(url);
  const handleClick = async (e) => {
    e.preventDefault();
    const shortUrl = await createShortUrl(url, customSlug);
    QueryClient.invalidateQueries({ queryKey: ["userUrls"] });

    setShortUrl(shortUrl);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col gap-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your long URL"
        className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        // required
      />
      <button
        type="submit"
        onClick={handleClick}
        className="bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-800 transition"
      >
        Shorten
      </button>
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 px-2 border bg-gray-300 rounded-l-md "
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied
                  ? `bg-green-500 text-white hover:bg-green-600`
                  : `bg-gray-200 hover:bg-gray-300`
              }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && (
        <input
          type="url"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="Enter your long URL"
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          // required
        />
      )}
    </div>
  );
};
export default UrlForm;
