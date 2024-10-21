"use client";
import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null); // Store processed image URL
  const [isUploading, setIsUploading] = useState(false);

  // Store the actual file separately
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file); // Store the file for upload
      setSelectedImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    setIsUploading(true); // Show loading state while uploading

    const formData = new FormData();
    formData.append('image', selectedFile); // Append the file to FormData

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setOutputImage(data.processedImageUrl); // Set the processed image URL returned by the backend
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false); // Hide loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Upload and Process Your Image</h1>
          <p className="text-lg text-gray-600">Select an image from your device, upload it, and see the processed result.</p>
        </div>

        {/* File Input */}
        <label className="block cursor-pointer">
          <span className="text-gray-800 sm:text-lg font-semibold mb-2 block text-center">Select an Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <div className="w-48 h-48 bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg mx-auto cursor-pointer hover:bg-gray-200 transition duration-150">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Click to Upload</span>
            )}
          </div>
        </label>

        {/* Upload Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-150 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            onClick={uploadImage}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Display Loading Indicator */}
        {isUploading && <div className="mt-4 text-blue-500 text-center">Uploading and processing image...</div>}

        {/* Display Processed Image (From Backend) */}
        {outputImage && (
          <div className="mt-8">
            <div className="w-48 h-48 border border-gray-300 rounded-lg overflow-hidden mx-auto">
              <img
                src={outputImage}
                alt="Processed Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-200">
        <p>Powered by <strong>Artify</strong> &bull; © 2024</p>
      </footer>
    </div>
  );
};

export default ImageUploader;
