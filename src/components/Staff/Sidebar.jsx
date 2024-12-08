import React, { useState } from 'react';

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const menuItems = [
  { name: 'Home', icon: 'fa-home', link: '/' },
  { 
    name: 'Tasks', 
    icon: 'fa-tasks',
    subItems: [
      { name: 'Add Task', link: '/tasks/add' },
      { name: 'Edit Task', link: '/tasks/edit' },
      { name: 'View Tasks', link: '/tasks/view' },
      { name: 'Task Analytics', link: '/tasks/analytics' },
    ]
  },
  { 
    name: 'Achievements', 
    icon: 'fa-trophy',
    link: '/achievements'
  },
  { 
    name: 'Notifications', 
    icon: 'fa-bell',
    link: '/achievements'
  },
  { 
    name: 'Team Chat', 
    icon: 'fa-user',
    subItems: [
      { name: 'General', link: '/settings/general' },
      { name: 'Security', link: '/settings/security' },
      { name: 'Preferences', link: '/settings/preferences' },
    ]
  },
];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="flex">
      <nav className="w-[80px] bg-white border-r h-screen flex flex-col">
        <div className="flex flex-col flex-1 py-4">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              <button
                className={cn(
                  "w-full flex flex-col items-center justify-center gap-1 px-2 py-4 text-gray-700 hover:bg-gray-100/60 relative group",
                  activeMenu === item.name && "text-blue-600 bg-blue-50",
                  hoveredItem === item.name && "bg-gray-100/60"
                )}
                onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <i className={`fas ${item.icon} text-xl ${activeMenu === item.name ? 'text-blue-600' : ''}`}></i>
                <span className="text-[10px] font-medium">{item.name}</span>
                {hoveredItem === item.name && (
                  <div className="absolute inset-0 border border-gray-200 rounded-md pointer-events-none" />
                )}
              </button>
            </div>
          ))}
        </div>
      </nav>
      {activeMenu && (
        <div className="w-[200px] bg-blue-50/50 border-r h-screen overflow-y-auto">
          <div className="py-4">
            {menuItems.find(item => item.name === activeMenu)?.subItems?.map((subItem) => (
              <a
                key={subItem.name}
                href={subItem.link}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-100/50"
              >
                {subItem.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;