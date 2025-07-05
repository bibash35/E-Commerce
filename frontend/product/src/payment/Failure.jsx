import React from 'react';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed!</h1>
      <p className="text-lg text-gray-700 mb-6">
        There was an issue with your payment. Please try again.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Failure;
