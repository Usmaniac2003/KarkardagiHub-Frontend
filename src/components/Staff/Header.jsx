/*import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">کارکردگی HUB</h1>
      <div className="flex items-center gap-4">
        <span>Mr Adnan Asif</span>
      </div>
    </header>
  );
}

export default Header;*/

import React from 'react';

const Header = () => {
  return (
    <div>
        <h1 className="py-10 px-6 text-2xl font-semibold text-gray-800">Staff Dashboard</h1>
        <div className="flex items-center">
          <span className="px-6 text-sm text-gray-600 mr-2">new notifications</span>
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
        </div>
    </div>
  );
};

export default Header;



