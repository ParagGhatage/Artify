import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 p-8">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 italic">About Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to Artify, where we believe in transforming your ordinary images into extraordinary art! Our mission is to empower individuals and creators by providing innovative tools and processes that enhance their visual expressions.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          At Artify, we leverage advanced technology and creative algorithms to apply unique artistic styles to your images. Whether you're looking to create stunning pieces for your portfolio or simply want to add a touch of flair to your personal photos, we've got you covered.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our team is passionate about art and technology, constantly working to improve our platform and provide you with the best experience possible. We are committed to helping you explore your creativity and unlock the full potential of your images.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Join Us on Our Journey</h2>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for being a part of the Artify community! We are excited to see the amazing artwork you create with our tools. Let's make art together!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
