import React from 'react';
import Link from 'next/link';

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 p-8">
      {/* Navigation buttons */}
      <div className="absolute top-4 right-4 flex space-x-4 text-xl">
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105">
          <Link href={'/'}>Home</Link>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105">
          <Link href={'/about'}>About</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white mt-20 shadow-2xl rounded-3xl p-10 w-full max-w-3xl text-center transform hover:scale-105 transition duration-500 ease-in-out">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 italic drop-shadow-md">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          We would love to hear from you! Whether you have questions, feedback, or just want to say hi, feel free to reach out to us.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-6 underline">Meet Our Team</h2>

        {/* Team Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-yellow-100 to-white p-6 rounded-xl shadow-lg text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Parag</h3>
            <p className="text-gray-600 mb-2"><Link href={"mailto:thunderwolf.dev@gmail.com"}>
            Email:<div className='text-blue-600'> thunderwolf.dev@gmail.com</div>
            </Link></p>
            <p className="text-gray-600 mb-2"><Link href={"https://paragghatage.com"}>
            Portfolio:<div className='text-blue-600'> paragghatage.com</div>
            </Link></p>
            <p className="text-gray-600 mb-2"><Link href={"https://github.com/ParagGhatage"}>
            GitHub: <div className='text-blue-600'> https://github.com/ParagGhatage </div>
            </Link></p>
            <p className="text-gray-600 mb-2"><Link href={"https://www.linkedin.com/in/parag-ghatage-09685a314/"}>
            LinkedIn: <div className='text-blue-600'> https://www.linkedin.com/in/parag-ghatage-09685a314/</div>
            </Link></p>
          </div>

          <div className="bg-gradient-to-br from-yellow-100 to-white p-6 rounded-xl shadow-lg text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pratham</h3>
            <p className="text-gray-600 mb-2"><Link href={"mailto:angdalwarpratham@gmail.com"}>
            Email:<div className='text-blue-600'> angdalwarpratham@gmail.com</div>
            </Link></p>
            <p className="text-gray-600 mb-2"><Link href={"https://pratham.app/"}>
            Portfolio:<div className='text-blue-600'> pratham.app</div>
            </Link></p>
            <p className="text-gray-600 mb-2"><Link href={"https://github.com/prthm20"}>
            GitHub: <div className='text-blue-600'> https://github.com/prthm20 </div>
            </Link></p>
            <p className="text-gray-600 mb-2"><Link href={"https://www.linkedin.com/in/pratham-angdalwar-194848320/"}>
            LinkedIn: <div className='text-blue-600'>https://www.linkedin.com/in/pratham-angdalwar-194848320/</div>
            </Link></p>
          </div>
        </div>

        {/* Final Thank You Note */}
        <p className="text-lg text-gray-700 mt-12 leading-relaxed">
          Thank you for reaching out to us! We look forward to hearing from you.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
