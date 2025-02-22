import React from "react";

const AuthFormLayout = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full space-y-10 bg-dark-secondary p-8 rounded-xl shadow-xl border border-dark-accent">
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
