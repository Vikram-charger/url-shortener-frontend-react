import { useState } from "react";
import { shortenUrl } from "../api/urlApi";

export default function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCopied(false);
    setLoading(true);

    try {
      const data = await shortenUrl(longUrl);
      setShortUrl(data.shortUrl);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
  <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">

    {/* Header */}
    {/* <h1 className="text-4xl font-extrabold text-center text-gray-800">
      🔗 Shorty
    </h1> */}

    <h1 className="text-center">
  <span className="text-5xl font-extrabold text-gray-900">
    🔗 Shorty
  </span>
  <span className="block mt-2 text-sm font-medium text-indigo-500">
    by Vikram
  </span>
</h1>

    <p className="text-center text-gray-500 mt-3 text-lg">
      Paste a long URL and get a short, shareable link
    </p>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-6"
    >
      <input
        type="url"
        placeholder="https://example.com/very/long/url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
        className="
          w-full
          h-16
          px-6
          text-lg
          border
          border-gray-300
          rounded-2xl
          focus:outline-none
          focus:ring-4
          focus:ring-indigo-400
          focus:border-indigo-500
          shadow-sm
        "
      />

      <button
        disabled={loading}
        className="
          w-full
          h-16
          bg-indigo-600
          text-white
          text-lg
          rounded-2xl
          font-semibold
          hover:bg-indigo-700
          transition
          disabled:opacity-60
        "
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>

    {/* Error */}
    {error && (
      <p className="text-red-500 text-center mt-6 text-lg">
        {error}
      </p>
    )}

    {/* Result */}
    {shortUrl && (
      <div className="mt-8 bg-gray-100 rounded-2xl p-6 flex items-center justify-between gap-4">
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 font-medium text-lg break-all"
        >
          {shortUrl}
        </a>

        <button
          onClick={copyToClipboard}
          className="
            h-12
            px-6
            bg-indigo-500
            text-white
            rounded-xl
            hover:bg-indigo-600
            transition
          "
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    )}
  </div>
</div>

  );
}
