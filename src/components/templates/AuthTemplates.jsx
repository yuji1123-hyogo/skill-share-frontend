import React, { useState } from "react";
import Tabs from "../molecules/TabSwitcher";
import LoginForm from "../forms/auth/LoginForm";
import RegisterForm from "../forms/auth/RegisterForm";

const AuthTemplates = () => {
  const [authMode, setAuthMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary py-12 px-4">
      <div className="max-w-md w-full p-8 ">
        <Tabs
          tabs={[
            { label: "ログイン", value: "login" },
            { label: "新規登録", value: "register" },
          ]}
          activeTab={authMode}
          onChange={setAuthMode}
          variant="minimal"
        />
        <div >
          {authMode === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm setAuthMode={setAuthMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTemplates;
