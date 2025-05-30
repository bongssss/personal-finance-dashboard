import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems =[
    {path: '/dashboard', label: '📊 Dashboard' },
    {path: '/budget', label: '💸 Budget' },
    {path: '/goals', label: '🎯 Goals'},
];

export default function SidebarLayout() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 p-4 fixed top-0 left-0 h-full z-40 transform transition-transform duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:block
        `}>
        <h1 className="text-2xl font-bold mb-6"> MyOpenIntelligence</h1>
        <nav className="space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} // close on nav click (mobile)
              className={`block px-4 py-2 rounded-lg transition-all
                ${location.pathname === item.path ? 'bg-white text-gray-900 font-semibold' : 'hover:bg-gray-700'}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 flex flex-col bg-gray-100">
  {/* Top bar */}
  <div className="flex justify-between items-center bg-white px-6 py-4 shadow-sm">
     <button
            className="md:hidden"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label="Toggle sidebar"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
           <br></br>
    <div className="text-lg font-medium text-gray-700">Welcome back 👋</div>
     <br></br>
    <div className="flex items-center space-x-4">
        <br></br>
      <div className="text-sm text-gray-600">Ubongabasi</div>
      <img
        src="https://i.pravatar.cc/40?u=user"
        alt="Avatar"
        className="w-10 h-10 rounded-full border"
      />
      <button className="text-sm text-red-500 hover:underline">Logout</button>
    </div>
  </div>

  {/* Page content */}
  <div className="p-6 flex-1 overflow-y-auto">
    <Outlet />
  </div>
</main>

    </div>
  );
}