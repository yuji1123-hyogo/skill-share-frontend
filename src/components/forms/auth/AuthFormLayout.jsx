import React from "react";

const AuthFormLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-dark-secondary p-8 rounded-xl shadow-xl border border-dark-accent">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
