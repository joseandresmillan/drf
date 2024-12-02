import React, { useEffect, useState } from "react";

function ApodPage() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(process.env.REACT_APP_NASA_API_KEY);
    const apiKey = process.env.REACT_APP_NASA_API_KEY;

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setImageData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch image");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading image...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <header className="py-6">
        <h1 className="text-3xl font-bold">Astronomy Picture of the Day</h1>
      </header>
      <main className="flex flex-col items-center max-w-4xl px-4">
        {imageData.media_type === 'image' ? (
          <img
            src={imageData.url}
            alt={imageData.title}
            className="w-full h-auto rounded-lg shadow-lg mb-4"
          />
        ) : (
          <iframe
            src={imageData.url}
            title={imageData.title}
            className="w-full h-96 rounded-lg shadow-lg mb-4"
          />
        )}
        <h2 className="text-2xl font-semibold mb-2">{imageData.title}</h2>
        <p className="text-sm text-gray-400 mb-6">{imageData.date}</p>
        <p className="text-justify text-lg">{imageData.explanation}</p>
        {imageData.copyright && (
          <p className="text-sm text-gray-500 mt-4">
            &copy; {imageData.copyright}
          </p>
        )}
      </main>
      <footer className="mt-auto py-4 bg-gray-800 w-full text-center">
        <p className="text-sm text-gray-400">
          Datos proporcionados por la NASA API.
        </p>
      </footer>
    </div>
  );
}

export default ApodPage;
