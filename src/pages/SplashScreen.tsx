import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <img 
              src="/assets/3UM-dark-logo.png" 
              alt="Company Logo" 
              className="w-20 h-20 rounded-full border-4 border-gray-700 shadow-md" 
            />
        </div>
    );
};

export default SplashScreen;