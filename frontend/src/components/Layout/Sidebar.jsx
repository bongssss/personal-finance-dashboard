import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-full p-4">
      <nav className="space-y-2">
       <Link to="/" className="block text-blue-700 font-medium">
       Dashboard
       </Link>
        {/* More links coming in Week 2+ */}
      </nav>
    </aside>
  );
};

export default Sidebar;
