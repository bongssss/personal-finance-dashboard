import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <div className="flex max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
