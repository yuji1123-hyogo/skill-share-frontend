import { useState } from "react";
import AuthTemplates from "../components/templates/AuthTemplates";
// import AuthTemplate from "../components/templates/AuthTemplate";
// import LoginForm from "../components/organisms/LoginForm";
// import RegisterForm from "../components/organisms/RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthTemplates/>
  );
};

export default AuthPage;
