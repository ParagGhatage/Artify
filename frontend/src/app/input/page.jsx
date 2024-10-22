"use client";
import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedContentImage, setSelectedContentImage] = useState(null);
  const [selectedStyleImage, setSelectedStyleImage] = useState(null);
  const [outputImages, setOutputImages] = useState([]); // Updated to handle multiple output images
  const [isUploading, setIsUploading] = useState(false);
  const [contentFile, setContentFile] = useState(null);
  const [styleFile, setStyleFile] = useState(null);
  const [iterations, setIterations] = useState("5"); // Default iteration values

  const handleContentImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setContentFile(file);
      setSelectedContentImage(URL.createObjectURL(file));
    }
  };

  const handleStyleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStyleFile(file);
      setSelectedStyleImage(URL.createObjectURL(file));
    }
  };

  const handleIterationsChange = (e) => {
    setIterations(e.target.value);
  };

  const uploadImages = async () => {
    if (!contentFile || !styleFile) {
      alert("Please select both content and style images.");
      return;
    }

    setIsUploading(true); // Show loading state while uploading

    const formData = new FormData();
    formData.append("content", contentFile);
    formData.append("style", styleFile);
    formData.append("iterations", JSON.stringify(iterations.split(',').map(Number))); // Convert iterations input to array of numbers

    try {
      const response = await axios.post("http://127.0.0.1:5000/style", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // Expect binary data for images
      });

      // Assuming the response contains multiple images as blobs
      const imageUrls = response.data.map((blob) => URL.createObjectURL(new Blob([blob], { type: "image/png" })));
      setOutputImages(imageUrls); // Set the processed images URLs
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false); // Hide loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Upload and Process Your Image
          </h1>
          <p className="text-lg text-gray-600">
            Select a content and style image from your device, upload them, and see the processed results.
          </p>
        </div>

        {/* Content Image Input */}
        <label className="block cursor-pointer mb-4">
          <span className="text-gray-800 sm:text-lg font-semibold mb-2 block text-center">
            Select Content Image:
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleContentImageChange}
            className="hidden"
          />
          <div className="w-48 h-48 bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg mx-auto cursor-pointer hover:bg-gray-200 transition duration-150">
            {selectedContentImage ? (
              <img
                src={selectedContentImage}
                alt="Content Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Click to Upload</span>
            )}
          </div>
        </label>

        {/* Style Image Input */}
        <label className="block cursor-pointer mb-4">
          <span className="text-gray-800 sm:text-lg font-semibold mb-2 block text-center">
            Select Style Image:
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleStyleImageChange}
            className="hidden"
          />
          <div className="w-48 h-48 bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg mx-auto cursor-pointer hover:bg-gray-200 transition duration-150">
            {selectedStyleImage ? (
              <img
                src={selectedStyleImage}
                alt="Style Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Click to Upload</span>
            )}
          </div>
        </label>

        {/* Iterations Input */}
        <div className="mb-4">
          <label className="text-gray-800 sm:text-lg font-semibold mb-2 block text-center">
            Iterations (comma-separated):
          </label>
          <input
            type="text"
            value={iterations}
            onChange={handleIterationsChange}
            className="border border-gray-300 text-slate-950 rounded-md p-2 w-full"
            placeholder="e.g., 250,500,750"
          />
        </div>

        {/* Upload Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-150 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            onClick={uploadImages}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Display Loading Indicator */}
        {isUploading && (
          <div className="mt-4 text-blue-500 text-center">
            Uploading and processing image...
          </div>
        )}

        {/* Display Processed Images */}
        {outputImages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Processed Images:</h2>
            <div className="grid grid-cols-3 gap-4">
              <h1>this is</h1>
              {outputImages.map((imageSrc, index) => (
                <div key={index} className="w-48 h-48 border border-gray-300 rounded-lg overflow-hidden mx-auto">
                  <img
                    src={imageSrc}
                    alt={`Processed Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-200">
        <p>
          Powered by <strong>Artify</strong> &bull; © 2024
        </p>
      </footer>
    </div>
  );
};

export default ImageUploader;
