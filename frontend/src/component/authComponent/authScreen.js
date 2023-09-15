import React from 'react';
import { FaGithub } from 'react-icons/fa';

function AuthScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Login with GitHub</h2>
        <button
          className="bg-gray-800 text-white hover:bg-gray-700 py-2 px-4 rounded-lg flex items-center justify-center w-full"
          onClick={() => {
            // Handle GitHub authentication here
          }}
        >
          <FaGithub className="text-xl mr-2" />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}

export default AuthScreen;
