'use client'
// pages/index.jsx
import { useState } from 'react';

export default function Home() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [artifiedImage, setArtifiedImage] = useState(null);

  const handleContentImageChange = (e) => {
    setContentImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleStyleImageChange = (e) => {
    setStyleImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleArtify = async () => {
    // For now, let's simulate the backend process
    // Later this will call the backend API to process images
    console.log('Artification process started...');
    // You can set a temporary result here, or handle API result later
    setArtifiedImage(contentImage); // Just a placeholder
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Artify Your Image</h1>
      
      {/* Content Image Upload */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Upload Content Image</label>
        <input type="file" accept="image/*" onChange={handleContentImageChange} />
      </div>

      {/* Style Image Upload */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Upload Style Image</label>
        <input type="file" accept="image/*" onChange={handleStyleImageChange} />
      </div>

      {/* Artify Button */}
      <button
        onClick={handleArtify}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Artify
      </button>

      {/* Display the images */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contentImage && (
          <div>
            <h2 className="text-xl font-semibold">Content Image</h2>
            <img src={contentImage} alt="Content" className="max-w-full" />
          </div>
        )}
        {styleImage && (
          <div>
            <h2 className="text-xl font-semibold">Style Image</h2>
            <img src={styleImage} alt="Style" className="max-w-full" />
          </div>
        )}
        {artifiedImage && (
          <div className="sm:col-span-2">
            <h2 className="text-xl font-semibold">Artified Image</h2>
            <img src={artifiedImage} alt="Artified" className="max-w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
