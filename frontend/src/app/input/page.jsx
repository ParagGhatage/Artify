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
  const [iterations, setIterations] = useState(100);
  const [timer, setTimer] = useState(120);
  const [intervalId, setIntervalId] = useState(null);

  // Sample images for content and style
  const sampleContentImages = [
    "/samples/content1.jpg",
    "/samples/content2.jpg",
    "/samples/content3.jpg",
  ];
  const sampleStyleImages = [
    "/samples/style1.jpg",
    "/samples/style2.jpg",
    "/samples/style3.jpg",
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
    setTimer(120);
    const id = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      stopTimer();
      setIsUploading(false);
    }
  }, [timer]);

  const uploadImages = async () => {
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
      const response = await axios.post("http://127.0.0.1:5000/style", formData, { responseType: "blob" });
      const imageUrls = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
      setOutputImages(imageUrls);
      stopTimer();
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
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
  };

  const selectSampleStyleImage = (sample) => {
    setSelectedStyleImage(sample);
    setStyleFile(null); // Clear any uploaded file
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Upload or Select Your Images
          </h1>

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
        <div className="flex justify-center">
          <button
            onClick={uploadImages}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
        <p className="text-lg text-gray-600 text-center">
            {isUploading && `Processing... Time remaining: ${timer} seconds`}
          </p>

        {/* Output Image */}
        {outputImages && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Processed Image:</h2>
            <img src={outputImages} alt="Processed Output" className="mt-4 max-w-full" />
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={downloadImage}
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
