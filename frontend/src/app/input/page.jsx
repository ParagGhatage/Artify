"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedContentImage, setSelectedContentImage] = useState(null);
  const [selectedStyleImage, setSelectedStyleImage] = useState(null);
  const [outputImages, setOutputImages] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [contentFile, setContentFile] = useState(null);
  const [styleFile, setStyleFile] = useState(null);
  const [iterations, setIterations] = useState(100); // Default iteration values
  const [timer, setTimer] = useState(120); // Reverse timer starting from 120 seconds (2 minutes)
  const [intervalId, setIntervalId] = useState(null); // Interval ID for clearing

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

  const startTimer = () => {
    setTimer(120); // Reset timer to 120 seconds
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) return prevTimer - 1;
        return prevTimer;
      });
    }, 1000);
    setIntervalId(id); // Store interval ID
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId); // Stop timer
    }
  };

  useEffect(() => {
    // Stop the timer when it reaches 0
    if (timer === 0) {
      stopTimer();
      setIsUploading(false); // Optionally handle timeout case
    }
  }, [timer]);

  const uploadImages = async () => {
    if (!contentFile || !styleFile) {
      alert("Please select both content and style images.");
      return;
    }

    setIsUploading(true); // Show loading state while uploading
    startTimer(); // Start timer when upload begins

    const formData = new FormData();
    formData.append("content", contentFile);
    formData.append("style", styleFile);
    formData.append("iterations", iterations); // Convert iterations input to array of numbers

    try {
      const response = await axios.post("http://127.0.0.1:5000/style", formData, { responseType: "blob" });
      const imageUrls = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
      setOutputImages(imageUrls); // Set the processed image URLs
      stopTimer(); // Stop the timer once the image is returned
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setIsUploading(false); // Hide loading state
    }
  };

  const downloadImage = () => {
    if (outputImages) {
      const link = document.createElement("a");
      link.href = outputImages;
      link.download = "processed_image.png";
      link.click();
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

        {/* Display Reverse Timer */}
        {isUploading && (
          <div className="mt-4 text-blue-500 text-center">
            Uploading and processing image... <br />
            Time remaining: {timer} seconds
          </div>
        )}

        {/* Display Processed Images */}
        {outputImages && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Processed Image:</h2>
            <div className="w-48 h-48 border border-gray-300 rounded-lg overflow-hidden mx-auto">
              <img
                src={outputImages}
                alt="Styled"
                id="image-container"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Download Button */}
            <div className="mt-4 text-center">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-150 focus:ring-4 focus:ring-green-300 focus:outline-none"
                onClick={downloadImage}
              >
                Download Image
              </button>
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
