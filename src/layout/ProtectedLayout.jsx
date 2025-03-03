import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userId = useSelector((state) => state.auth.userId);
  if(!userId){
    return  <Navigate to="/auth" replace />
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
      />

      <div className="pt-16 flex min-h-screen">
        {/* サイドバー */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* メインコンテンツ */}
        <main 
          className={`
            flex-1 
            transition-all 
            duration-300 
            p-6
            ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
