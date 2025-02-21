import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../features/RTK/authSlice";
import { 
  HiHome, 
  HiUser, 
  HiUsers, 
  HiOfficeBuilding,
  HiSearch,
  HiLogout, 
  HiMap
} from "react-icons/hi";
const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.userId);

  const handleLogout = async () => {
    dispatch(logoutAsync());
  };

  const navItems = [
    { to: "/", label: "ホーム", icon: HiHome },
    { to: `/profile/${currentUserId}`, label: "プロフィール", icon: HiUser },
    { to: `/following/${currentUserId}`, label: "フォロー一覧", icon: HiUsers },
    { to: "/clubManagement", label: "クラブ管理", icon: HiOfficeBuilding },
    { to: "/search", label: "検索", icon: HiSearch },
    { to: "/geoLocation", label: "位置情報", icon: HiMap },
  ];

  return (
    <nav 
      className={`
        fixed left-0 top-16 
        h-[calc(100vh-4rem)] 
        bg-dark-secondary 
        border-r border-dark-accent
        transition-all 
        duration-300 
        z-40
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full hidden'}
      `}
    >
      <div className="flex flex-col h-full w-64">
        <div className="flex-1 space-y-1 p-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                flex items-center gap-3 
                px-4 py-2.5 
                rounded-lg 
                transition-colors 
                duration-200
                ${isActive 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'text-gray-400 hover:bg-purple-500/10 hover:text-gray-200'}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="opacity-100">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="p-3 border-t border-dark-accent">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors duration-200"
          >
            <HiLogout className="w-5 h-5 flex-shrink-0" />
            <span className="opacity-100">ログアウト</span>
          </button>
        </div>
      </div>
    </nav>
  );
};


export default Sidebar;
