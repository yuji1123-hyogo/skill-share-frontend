import React from "react";


//***************UIはcursor作****************** */

const TabSwitcher = ({ tabs, activeTab, onChange, variant = "default" }) => {
  const variants = {
    default: {
      wrapper: "flex justify-center border-b border-dark-accent",
      tab: "px-4 py-2 text-sm font-medium transition-colors duration-200",
      active: "text-blue-500 border-b-2 border-blue-500",
      inactive: "text-gray-400 hover:text-gray-300"
    },
    pills: {
      wrapper: "flex justify-center gap-2 p-1 bg-dark-primary rounded-lg",
      tab: "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
      active: "bg-blue-600 text-white shadow-lg",
      inactive: "text-gray-400 hover:bg-dark-accent hover:text-gray-200"
    },
    minimal: {
      wrapper: "flex justify-center gap-4",
      tab: "px-2 py-1 text-sm font-medium transition-colors duration-200",
      active: "text-white border-b-2 border-blue-500",
      inactive: "text-gray-400 hover:text-gray-300"
    }
  };

  const style = variants[variant];

  return (
    <div className={style.wrapper}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`${style.tab} ${
            activeTab === tab.value ? style.active : style.inactive
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
