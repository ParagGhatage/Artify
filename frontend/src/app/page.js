"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const ImageUploader = () => {
  const [selectedContentImage, setSelectedContentImage] = useState(null);
  const [selectedStyleImage, setSelectedStyleImage] = useState(null);
  const [outputImages, setOutputImages] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [contentFile, setContentFile] = useState(null);
  const [styleFile, setStyleFile] = useState(null);
  const [iterations, setIterations] = useState(100);
  const [timer, setTimer] = useState(120);
  const [intervalId, setIntervalId] = useState(null);

  // Sample images for content and style
  const sampleContentImages = [
    "/samples/content1.jpg",
    "/samples/content2.jpg",
    "/samples/content3.jpg",
    "/samples/content4.jpg",
    "/samples/content5.jpg",
  ];
  const sampleStyleImages = [
    "/samples/style1.jpg",
    "/samples/style2.jpg",
    "/samples/style3.jpg",
    "/samples/style4.png",
    "/samples/style5.png",
  ];

  const [useSampleContent, setUseSampleContent] = useState(false);
  const [useSampleStyle, setUseSampleStyle] = useState(false);

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
    setTimer(120); // Reset the timer to 120 seconds
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) return prevTimer - 1;
        stopTimer(); // Stop the timer when it reaches 0
        return 0;
      });
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null); // Reset the interval ID after clearing it
    }
  };

  useEffect(() => {
    if (timer === 0) {
      stopTimer();
      setIsUploading(false);
    }
  }, [timer]);

  const uploadImages = async () => {
    // Clear any existing timer before starting a new upload
    stopTimer();

    setIsUploading(true);
    startTimer();

    const formData = new FormData();
    // Include selected content image or uploaded file
    if (contentFile) {
      formData.append("content", contentFile);
    } else if (selectedContentImage) {
      const response = await fetch(selectedContentImage);
      const blob = await response.blob();
      formData.append("content", blob, "content_image.jpg");
    } else {
      alert("Please select a content image.");
      setIsUploading(false);
      stopTimer();
      return;
    }

    // Include selected style image or uploaded file
    if (styleFile) {
      formData.append("style", styleFile);
    } else if (selectedStyleImage) {
      const response = await fetch(selectedStyleImage);
      const blob = await response.blob();
      formData.append("style", blob, "style_image.jpg");
    } else {
      alert("Please select a style image.");
      setIsUploading(false);
      stopTimer();
      return;
    }

    formData.append("iterations", iterations);

    try {
      const response = await axios.post("https://artify-563601529608.us-central1.run.app/style", formData, { responseType: "blob" });
      const imageUrls = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
      setOutputImages(imageUrls);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      stopTimer(); // Ensure the timer is stopped once the upload completes
      setIsUploading(false);
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

  const selectSampleContentImage = (sample) => {
    setSelectedContentImage(sample);
    setContentFile(null); // Clear any uploaded file
    setUseSampleContent(false); // Hide sample images after selection
  };

  const selectSampleStyleImage = (sample) => {
    setSelectedStyleImage(sample);
    setStyleFile(null); // Clear any uploaded file
    setUseSampleStyle(false); // Hide sample images after selection
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 p-6">
    <img 
    src="/logo.png" 
    alt="Logo" 
    className="max-w-80"
    />


    
<div className="absolute top-4 right-4 flex space-x-4">
  <div className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105">
    <Link href={'/about'}>About</Link>
  </div>
  <div className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105">
    <Link href={'/contact'}>Contact</Link>
  </div>
</div>

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
      <div className="text-center mb-8">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">
    Upload or Select Your Images
  </h1>
  <p className="text-lg text-gray-600 mb-2">
    Transform your images with stunning artistic styles!
  </p>
  <p className="text-lg text-gray-600">
    Just upload and let your creativity shine!
  </p>
</div>


        {/* Toggle to use sample content image */}
        <div className="mb-4">
          <label className="block mb-2 text-center text-amber-300">
            <input
              type="checkbox"
              checked={useSampleContent}
              onChange={() => setUseSampleContent(!useSampleContent)}
            />
            Use sample content image
          </label>
        </div>

        {/* Content Image Input */}
        {useSampleContent ? (
          <div className="flex justify-center gap-4 mb-4">
            {sampleContentImages.map((sample, index) => (
              <img
                key={index}
                src={sample}
                alt={`Sample Content ${index + 1}`}
                className={`w-24 h-24 cursor-pointer rounded-lg ${selectedContentImage === sample ? "border-4 border-blue-500" : "border-2"}`}
                onClick={() => selectSampleContentImage(sample)}
              />
            ))}
          </div>
        ) : (
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
        )}

        {/* Toggle to use sample style image */}
        <div className="mb-4">
          <label className="block mb-2 text-center text-amber-300">
            <input
              type="checkbox"
              checked={useSampleStyle}
              onChange={() => setUseSampleStyle(!useSampleStyle)}
            />
            Use sample style image
          </label>
        </div>

        {/* Style Image Input */}
        {useSampleStyle ? (
          <div className="flex justify-center gap-4 mb-4">
            {sampleStyleImages.map((sample, index) => (
              <img
                key={index}
                src={sample}
                alt={`Sample Style ${index + 1}`}
                className={`w-24 h-24 cursor-pointer rounded-lg ${selectedStyleImage === sample ? "border-4 border-blue-500" : "border-2"}`}
                onClick={() => selectSampleStyleImage(sample)}
              />
            ))}
          </div>
        ) : (
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
        )}

        {/* Iterations Input */}
        <div className="mb-4">
         
        </div>

        {/* Upload Button */}
        <button
          onClick={uploadImages}
          disabled={isUploading}
          className={`w-full  bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isUploading ? `Uploading..` : "Upload"}
        
        </button>
        <p className={`text-center ${isUploading ? 'animate-pulse' : ''}`}>
  {isUploading ? (
    <span className="text-xl font-semibold text-slate-700">
      Time Remaining... 
      <span className="text-indigo-600"> {timer}s</span>
    </span>
  ) : ""}
</p>


        {/* Output Image Display */}
        {outputImages && (
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Processed Image:</h2>
            <img
              src={outputImages}
              alt="Processed Output"
              className="object-cover w-80 h-80 rounded-lg mx-auto mb-4"
            />
            <button
              onClick={downloadImage}
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Download Processed Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
