import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 p-8">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 italic">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          We would love to hear from you! Whether you have questions, feedback, or just want to say hi, feel free to reach out to us.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Meet Our Team</h2>
        
        <div className="flex flex-col items-center mb-8">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Parag</h3>
          <p className="text-gray-600 mb-2">Email: parag@example.com</p>
          <p className="text-gray-600 mb-2">GitHub: 
            <a href="https://github.com/ParagGhatage" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> github.com/parag</a>
          </p>
          <p className="text-gray-600 mb-2">Instagram: 
            <a href="https://instagram.com/parag" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> @parag</a>
          </p>
        </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Pratham</h3>
          <p className="text-gray-600 mb-2">Email: aprathamm@gmail.com</p>
          <p className="text-gray-600 mb-2">GitHub: 
            <a href="https://github.com/prthm20" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> github.com/pratham</a>
          </p>
          <p className="text-gray-600 mb-2">Instagram: 
            <a href="https://instagram.com/prthm2004" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> @pratham</a>
          </p>
        </div>

        
        <p className="text-lg text-gray-600">
          Thank you for reaching out to us!
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
