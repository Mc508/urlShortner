import { useState } from "react";
import axios from "axios";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState();
  //   console.log(url);
  const handleClick = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/api/create", {
      url,
    });

    setShortUrl(data);
    console.log(shortUrl);

    // console.log(data);
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
    </div>
  );
};
export default UrlForm;
