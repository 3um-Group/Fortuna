import React from 'react';

const DrawerMenu: React.FC = () => {
  return (
    <div className="bg-white h-32 w-full flex flex-col justify-between rounded-t-3xl shadow-lg fixed bottom-0 p-4 z-50">
      <div className="flex justify-evenly mb-2">
        <button className="bg-white border border-black text-black pa-2 mx-2 rounded-lg w-1/2">
          Request Info
        </button>
        <button className="bg-orange-500 text-white py-2 mx-2 rounded-lg w-1/2">
          Schedule Tour
        </button>
      </div>
      <p className="text-center text-gray-600 text-sm">
        Request a tour as early as 10 AM tomorrow!
      </p>
    </div>
  );
};

export default DrawerMenu;
