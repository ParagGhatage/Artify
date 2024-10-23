import React from 'react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 p-8">
      <div className="absolute top-4 right-4 flex space-x-4 text-xl">
  <div className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105">
    <Link href={'/'}>Home</Link>
  </div>
  <div className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105">
    <Link href={'/contact'}>Contact us</Link>
  </div>
</div>
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl text-center mt-20 transform hover:scale-105 transition duration-500 ease-in-out">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 italic drop-shadow-md">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to <span className="font-semibold text-indigo-500">Artify</span>, where we believe in transforming your ordinary images into extraordinary art! Our mission is to empower individuals and creators by providing innovative tools and processes that enhance their visual expressions.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          At Artify, we leverage advanced technology and creative algorithms to apply unique artistic styles to your images. Whether you&apos;re looking to create stunning pieces for your portfolio or simply want to add a touch of flair to your personal photos, we&apos;ve got you covered.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Our team is passionate about art and technology, constantly working to improve our platform and provide you with the best experience possible. We are committed to helping you explore your creativity and unlock the full potential of your images.
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-6 underline">
          Join Us on Our Journey
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Thank you for being a part of the <span className="font-semibold text-indigo-500">Artify</span> community! We are excited to see the amazing artwork you create with our tools. Let&apos;s make art together!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
