import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {login ? (
          <LoginForm state={setLogin} />
        ) : (
          <RegisterForm state={setLogin} />
        )}
      </div>
    </div>
  );
};
export default AuthPage;
