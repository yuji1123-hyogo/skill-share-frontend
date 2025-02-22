import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-dark-secondary border-b border-dark-accent z-50">
      <div className="h-full px-4 flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-dark-accent transition-colors duration-200"
          aria-label="メニューを切り替え"
        >
          {isSidebarOpen ? (
            <HiX className="w-6 h-6 text-white" />
          ) : (
            <HiMenu className="w-6 h-6 text-white" />
          )}
        </button>
        
        <Link to="/" className="ml-4 text-xl font-bold text-purple-500/50 drop-shadow-lg">
          SKILL-SHARE
        </Link>
      </div>
    </header>
  );
};

export default Header; 